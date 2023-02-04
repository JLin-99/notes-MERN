import { useSelector, useDispatch } from "react-redux";
import { ImCross } from "react-icons/im";
import { deleteNote } from "../features/notes/noteSlice";
import { resetModal } from "../features/modal/modalSlice";

const DelConfirmDialog = () => {
  const { modalNote } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteNote(modalNote._id));
    dispatch(resetModal());
  };

  return (
    <div className="flex h-full grow flex-col items-center justify-center text-gray-800">
      <h2 className="flex items-center gap-5 p-7 text-5xl font-bold">
        <ImCross color="darkred" /> Delete
      </h2>
      <div className="mb-11 flex grow flex-col items-center font-bold">
        <h3 className="text-lg text-gray-600">Title:</h3>
        <p className="text-3xl">"{modalNote.title}"</p>
      </div>

      <p className="mb-5 text-lg">Are you sure you want to delete this note?</p>
      <div className="flex gap-9">
        <button
          className="inline-block w-24 rounded-lg border-2 border-gray-900 py-3 text-xl font-medium uppercase leading-tight text-gray-900 transition duration-100 ease-in-out hover:bg-amber-600 hover:bg-opacity-50 focus:outline-none focus:ring-0"
          onClick={handleDelete}
        >
          Yes
        </button>
        <button
          className="inline-block w-24 rounded-lg border-2 border-gray-900 py-3 text-xl font-medium uppercase leading-tight text-gray-900 transition duration-100 ease-in-out hover:bg-amber-600 hover:bg-opacity-50 focus:outline-none focus:ring-0"
          onClick={() => dispatch(resetModal())}
        >
          No
        </button>
      </div>
    </div>
  );
};
export default DelConfirmDialog;
