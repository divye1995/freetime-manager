import { useEffect, useState } from "react";
import Modal from "react-modal";
import ModalHolder from "../components/ModalHolder/ModalHolder";
import TaskSuggesionFormV1 from "../components/TaskSuggesionFormV1";
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

function TaskSuggestionEditor({
  suggestion,
  onDone,
}: {
  suggestion: TaskSuggestionDocument | null;
  onDone: () => void;
}) {
  // const { updateSuggestion } = useSuggestion();
  useEffect(() => {
    if (suggestion) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [suggestion]);

  function onCloseModal() {
    setIsOpen(false);
    onDone();
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }
  function onSubmit(task: TaskSuggestionDocument) {
    // start loader
    // updateSuggestion(task).then((result) => {
    //   // stop loader
    //   if (result.kind === "Error") {
    //     // display error
    //   } else {
    //     onCloseModal();
    //     onDone();
    //   }
    // });
  }
  const [modalIsOpen, setIsOpen] = useState(false);

  return suggestion ? (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={onCloseModal}
        style={customStyles}
        contentLabel="Create"
      >
        <ModalHolder onClose={onCloseModal}>
          <TaskSuggesionFormV1<TaskSuggestionDocument>
            taskSuggestion={suggestion}
            onSubmit={onSubmit}
          />
        </ModalHolder>
      </Modal>
    </div>
  ) : (
    <></>
  );
}
export default TaskSuggestionEditor;
