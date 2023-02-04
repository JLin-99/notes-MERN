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
  const handleBtn = (btn) => {
    console.log(btn);
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="flex h-full w-full grow flex-col bg-gray-200">
      <header className="flex w-full items-center gap-10  py-5 px-10">
        <h1 className="text-5xl font-extrabold">My notes</h1>
        <div className="flex items-center gap-5">
          <div
            className="cursor-pointer rounded-lg border-2 border-gray-900 px-3 py-2 text-base font-medium uppercase leading-tight text-gray-900 transition duration-100 ease-in-out hover:bg-amber-600 hover:bg-opacity-50 focus:outline-none focus:ring-0"
            onClick={openModal}
          >
            Create note
          </div>
          <div className="cursor-pointer hover:text-amber-900 hover:underline">
            Archived notes
          </div>
        </div>
      </header>

      <div className="flex h-full grow flex-wrap gap-5 p-5">
        {notes.map((note) => (
          <NoteItem key={note._id} note={note} handleBtn={handleBtn} />
        ))}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="New Note"
      >
        <NewNote closeModal={closeModal} />
      </Modal>
    </div>
  );
};
export default Board;
