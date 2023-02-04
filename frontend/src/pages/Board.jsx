import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNotes, reset } from "../features/notes/noteSlice";
import {
  openModal,
  resetModal,
  setModalType,
} from "../features/modal/modalSlice";
import Modal from "react-modal";
import NewNote from "../components/NoteForm";
import Spinner from "../components/Spinner";
import NoteItem from "../components/NoteItem";

Modal.setAppElement("#root");

const Board = () => {
  const { notes, isLoading, isSuccess } = useSelector((state) => state.note);
  const { isModalOpen } = useSelector((state) => state.modal);
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

  const handleCreateNote = () => {
    dispatch(setModalType("Create"));
    dispatch(openModal());
  };

  return (
    <div className="flex h-full w-full grow flex-col bg-gray-200">
      <header className="flex w-full items-center gap-10 py-5 px-10">
        <h1 className="text-5xl font-extrabold">My notes</h1>
        <div className="flex items-center gap-5">
          <div
            className="cursor-pointer rounded-lg border-2 border-gray-900 px-3 py-2 text-base font-medium uppercase leading-tight text-gray-900 transition duration-100 ease-in-out hover:bg-amber-600 hover:bg-opacity-50 focus:outline-none focus:ring-0"
            onClick={handleCreateNote}
          >
            Create note
          </div>
          <div className="cursor-pointer hover:text-amber-900 hover:underline">
            Archived notes
          </div>
        </div>
      </header>

      {isLoading && !isModalOpen ? (
        <Spinner />
      ) : (
        <div className="flex grow flex-wrap content-start gap-5 p-5">
          {notes.map((note) => (
            <NoteItem key={note._id} note={note} />
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => dispatch(resetModal())}
        className={`rounded-lg border-2 border-gray-800 bg-gray-200 p-5 focus:outline-none ${"relative top-1/2 left-1/2 right-auto bottom-auto mr-[-50%] min-h-[50%] w-1/2 translate-x-[-50%] translate-y-[-50%]"}`}
      >
        <NewNote />
      </Modal>
    </div>
  );
};
export default Board;
