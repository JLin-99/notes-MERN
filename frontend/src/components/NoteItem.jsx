import { useDispatch } from "react-redux";
import { deleteNote } from "../features/notes/noteSlice";
import { FaEdit, FaStickyNote, FaTrashAlt } from "react-icons/fa";
import { BsFillArchiveFill } from "react-icons/bs";

const NoteItem = ({ note, handleBtn }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteNote(note._id));
  };
  return (
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
        <div>Last edited: {new Date(note.updatedAt).toLocaleDateString()}</div>
      </div>
      <div className="flex cursor-pointer items-center gap-4 self-end">
        <BsFillArchiveFill size={30} onClick={() => handleBtn("archive")} />
        <FaEdit size={30} onClick={() => handleBtn("edit")} />
        <FaTrashAlt size={30} onClick={handleDelete} />
      </div>
    </div>
  );
};
export default NoteItem;
