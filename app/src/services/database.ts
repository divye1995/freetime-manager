import PouchDB from "pouchdb";

export type DB = PouchDB.Database;

export type DocumentId = string;

export interface DocumentPrototype {
  _id: DocumentId;
  _rev: string;
}
export type DocumentChange<T> = {
  id: DocumentId;
  deleted: boolean;
  doc: T;
};
export type DBChangeOption<T extends DocumentPrototype> = ResultOption<
  DocumentChange<T>
>;
export type DBResultOption<T extends DocumentPrototype> = ResultOption<T>;
export type DBResultsOption<T extends DocumentPrototype> = ResultOption<T[]>;

export type ResultOption<T> = DBResult<T> | DBError;
export type DBResult<T> = {
  kind: "Result";
  value: T;
};
export type DBError = {
  kind: "Error";
  value: string;
};

export class LocalDocumentDatabase<T extends DocumentPrototype> {
  db: DB;
  constructor(name = "localdb") {
    this.db = new PouchDB(name);
  }
  // TODO : fix with proper types
  async put(doc: any): Promise<DBResultOption<T>> {
    try {
      var { id, rev } = await (doc._id ? this.db.put(doc) : this.db.post(doc));
      return {
        value: { ...doc, _id: id, _rev: rev },
      } as DBResult<T>;
    } catch (err) {
      console.error("LocalDocumentDatabase:put", " ", err);
      return {
        kind: "Error",
        value: err,
      } as DBError;
    }
  }

  async get(id: DocumentId): Promise<DBResultOption<T>> {
    try {
      var doc = await this.db.get<T>(id);
      return { value: doc } as DBResult<T>;
    } catch (err) {
      console.error("LocalDocumentDatabase:get", " ", err);
      return {
        value: err,
        kind: "Error",
      } as DBError;
    }
  }
  async remove(doc: DocumentPrototype): Promise<DBResultOption<T>> {
    try {
      var { id, rev } = await this.db.remove(doc);
      return {
        kind: "Result",
        value: { _id: id, _rev: rev },
      } as DBResult<T>;
    } catch (err) {
      return {
        value: err,
        kind: "Error",
      } as DBError;
    }
  }

  async getAll(): Promise<DBResultsOption<T>> {
    try {
      // TODO:  add a limit to support pagination later
      var result = await this.db.allDocs({ include_docs: true });
      if (result.total_rows === 0) {
        // no docs
        return {
          kind: "Result",
          value: [],
        };
      } else {
        return {
          kind: "Result",
          value: result.rows.map((row) => row.doc as T),
        };
      }
    } catch (err) {
      return {
        value: err,
        kind: "Error",
      } as DBError;
    }
  }

  watch(onChange: (change: DBChangeOption<T>) => void): () => void {
    const changes = this.db
      .changes<T>({
        since: "now",
        live: true,
        include_docs: true,
      })
      .on("change", (change) => {
        const { id, doc, deleted } = change;
        onChange({
          kind: "Result",
          value: { id, doc, deleted } as DocumentChange<T>,
        });
      })
      .on("error", (err) => {
        onChange({
          kind: "Error",
          value: err,
        });
      });
    return () => changes.cancel();
  }
}
