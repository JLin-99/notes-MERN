import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNotes, reset } from "../features/notes/noteSlice";
import Modal from "react-modal";
import NewNote from "../components/NewNote";
import Spinner from "../components/Spinner";
import NoteItem from "../components/NoteItem";

const customStyles = {
  content: {
    width: "50%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
};

Modal.setAppElement("#root");

const Board = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { notes, isLoading, isSuccess } = useSelector((state) => state.note);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  if (isLoading) return <Spinner />;

  return (
    <div className="grow">
      <h2>Board</h2>
      {/* <NewNote /> */}
      <button onClick={openModal}>New Note</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="New Note"
      >
        <NewNote closeModal={closeModal} />
      </Modal>

      <div>
        <div>My Notes</div>
        <div>
          <button>Create note</button>
          <button>Archived notes</button>
        </div>
      </div>
      <div>
        {notes.map((note) => (
          <NoteItem key={note._id} note={note} />
        ))}
      </div>
    </div>
  );
};
export default Board;
