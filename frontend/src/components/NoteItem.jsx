import { useDispatch } from "react-redux";
import { deleteNote, updateNote } from "../features/notes/noteSlice";
import {
  openModal,
  setModalNote,
  setModalType,
} from "../features/modal/modalSlice";
import { FaEdit, FaStickyNote, FaTrashAlt, FaUpload } from "react-icons/fa";
import { BsFillArchiveFill } from "react-icons/bs";

const NoteItem = ({ note }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(setModalType("delete"));
    dispatch(setModalNote(note));
    dispatch(openModal());
  };

  const handleEdit = () => {
    dispatch(setModalType("Edit"));
    dispatch(setModalNote(note));
    dispatch(openModal());
  };

  const handleArchive = () => {
    dispatch(updateNote({ ...note, archived: !note.archived }));
  };

  const handleBtn = () => {
    console.log("nada");
  };

  return (
    <>
      <div className="flex h-full w-[48%] min-w-[420px] gap-5 rounded-md border-2 border-gray-900 p-5 text-gray-900 transition duration-100 ease-in-out hover:bg-amber-600 hover:bg-opacity-50 focus:outline-none focus:ring-0">
        <FaStickyNote
          size={70}
          className="cursor-pointer"
          onClick={() => handleBtn("show")}
        />
        <div
          className="flex grow cursor-pointer flex-col"
          onClick={() => handleBtn("show")}
        >
          <div className="mb-3 text-xl font-bold">{note.title}</div>
          <div>
            Last edited: {new Date(note.updatedAt).toLocaleDateString()}
          </div>
        </div>
        <div className="flex cursor-pointer items-center gap-4 self-end">
          {note.archived ? (
            <FaUpload
              size={25}
              onClick={handleArchive}
              className="mr-2 hover:opacity-80"
            />
          ) : (
            <BsFillArchiveFill
              size={30}
              onClick={handleArchive}
              className="hover:opacity-80"
            />
          )}

          <FaEdit size={30} onClick={handleEdit} className="hover:opacity-80" />
          <FaTrashAlt
            size={30}
            onClick={handleDelete}
            className="hover:opacity-80"
          />
        </div>
      </div>
    </>
  );
};
export default NoteItem;
