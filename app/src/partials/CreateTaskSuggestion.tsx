import { useContext, useState } from "react";
import Modal from "react-modal";
import ModalHolder from "../components/ModalHolder/ModalHolder";
import TaskSuggesionFormV1 from "../components/TaskSuggesionFormV1";
import { TaskContextType, TasksContext } from "../providers/context";
import { TaskSuggestion } from "../utils/TaskSuggestion";
import { TaskSuggestionDocument } from "../utils/types";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "80%",
    width: "80%",
  },
};
Modal.setAppElement("#root");

function TaskSuggestionCreator({
  isOpen = false,
  onDone,
}: {
  isOpen: boolean;
  onDone: (result: {
    cancel?: boolean;
    created?: boolean;
    suggestion?: TaskSuggestionDocument;
  }) => void;
}) {
  const { suggestionsDb } = useContext<TaskContextType>(TasksContext);
  const [suggestion] = useState<TaskSuggestion>({
    type: "create",
    suggestion: "",
  });
  function onCloseModal() {
    onDone({ cancel: true });
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }
  function onSubmit(task: TaskSuggestion) {
    (async () => {
      var resp = await suggestionsDb.put(task);
      if (resp.kind === "Error") {
        // TODO add error handling
        console.log("Show Error", resp.value);
        onDone({ cancel: true });
        return;
      }
      onDone({ suggestion: resp.value });
    })();
  }
  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={onCloseModal}
      style={customStyles}
      contentLabel="Create"
    >
      <ModalHolder onClose={onCloseModal}>
        <TaskSuggesionFormV1 taskSuggestion={suggestion} onSubmit={onSubmit} />
      </ModalHolder>
    </Modal>
  );
}
export default TaskSuggestionCreator;
