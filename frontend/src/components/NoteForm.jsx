import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createNote, reset, updateNote } from "../features/notes/noteSlice";
import Category from "./Category";
import Spinner from "./Spinner";

// const NoteForm = ({ noteData, closeModal }) => {
//   const [note, setNote] = useState(noteData);
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [category, setCategory] = useState("");
//   const { isLoading, isError, isSuccess, message } = useSelector(
//     (state) => state.note
//   );
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (isError) {
//       toast.error(message);
//     }

//     if (isSuccess) {
//       dispatch(reset());
//       closeModal();
//     }

//     dispatch(reset());
//   }, [dispatch, isError, isSuccess, navigate, message]);

//   const onSubmit = (e) => {
//     e.preventDefault();
//     dispatch(createNote({ title, content, categories }));
//   };

//   const deleteCategory = (category) => {
//     setCategories((prev) => prev.filter((c) => c !== category));
//   };

//   const addCategory = (e) => {
//     e.preventDefault();
//     if (!category) return;

//     if (categories.includes(category)) {
//       toast.error(`The category "${category}" already exist`);
//     } else {
//       setCategories((prevCategories) => [...prevCategories, category]);
//       setCategory("");
//     }
//   };

//   return (
//     <div className="flex h-full w-full flex-col justify-center p-5">
//       <section className="">
//         <h2 className="mb-10 text-5xl">Create/Edit note</h2>
//       </section>
//       {isLoading ? (
//         <Spinner />
//       ) : (
//         <section>
//           <form onSubmit={onSubmit} className="flex flex-col gap-5">
//             <div className="flex items-center gap-2">
//               <label className="inline-block w-1/6 font-bold">Title</label>
//               <input
//                 className="m-0 grow rounded-lg border border-solid border-gray-300 px-3 py-3 text-base font-normal text-gray-700 transition ease-in-out focus:border-amber-500 focus:outline-none"
//                 type="text"
//                 name="title"
//                 id="title"
//                 placeholder="Enter a title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//               />
//             </div>
//             <div className="flex gap-2">
//               <label className="inline-block w-1/6 pt-2 font-bold">
//                 Content
//               </label>
//               <textarea
//                 className="m-0 h-36 min-h-[9rem] grow rounded-lg border border-solid border-gray-300 px-3 py-3 text-base font-normal text-gray-700 transition ease-in-out focus:border-amber-500 focus:outline-none"
//                 name="content"
//                 id="content"
//                 placeholder="Add some details..."
//                 value={content}
//                 onChange={(e) => setContent(e.target.value)}
//               />
//             </div>
//             <div className="mb-2 flex gap-3">
//               <label className="inline-block w-1/6 pt-2 font-bold">
//                 Categories
//               </label>
//               <div className="flex w-full grow flex-col">
//                 <div className="mb-3 flex h-24 grow flex-wrap items-start gap-2 overflow-auto rounded-lg border border-solid bg-white p-2">
//                   {categories.map((category) => (
//                     <Category
//                       key={category}
//                       deleteCategory={deleteCategory}
//                       category={category}
//                     />
//                   ))}
//                 </div>
//                 <div className="flex items-center gap-5">
//                   <input
//                     type="text"
//                     name="category"
//                     id="category"
//                     placeholder="Add category"
//                     value={category}
//                     onChange={(e) => setCategory(e.target.value)}
//                     className="m-0 grow rounded-lg border border-solid border-gray-300 px-3 py-3 text-base font-normal text-gray-700 transition ease-in-out focus:border-amber-500 focus:outline-none"
//                   />
//                   <button
//                     className="inline-block rounded-lg border-2 border-gray-900 px-6 py-3 text-sm font-medium uppercase leading-tight text-gray-900 transition duration-100 ease-in-out hover:bg-amber-600 hover:bg-opacity-50 focus:outline-none focus:ring-0"
//                     onClick={addCategory}
//                   >
//                     Add category
//                   </button>
//                 </div>
//               </div>
//             </div>
//             <div className="flex items-center justify-end gap-5">
//               <button
//                 className="inline-block rounded-lg border-2 border-gray-900 px-6 py-3 text-sm font-medium uppercase leading-tight text-gray-900 transition duration-100 ease-in-out hover:bg-amber-600 hover:bg-opacity-50 focus:outline-none focus:ring-0"
//                 onClick={() => closeModal()}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="inline-block rounded-lg border-2 border-gray-900 px-6 py-3 text-sm font-medium uppercase leading-tight text-gray-900 transition duration-100 ease-in-out hover:bg-amber-600 hover:bg-opacity-50 focus:outline-none focus:ring-0"
//               >
//                 Save
//               </button>
//             </div>
//           </form>
//         </section>
//       )}
//     </div>
//   );
// };
const NoteForm = ({ noteData, action, closeModal }) => {
  const [note, setNote] = useState(
    noteData
      ? noteData
      : {
          title: "",
          content: "",
          categories: [],
        }
  );
  const [category, setCategory] = useState("");
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.note
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      dispatch(reset());
      closeModal();
    }

    dispatch(reset());
  }, [dispatch, isError, isSuccess, navigate, message]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (action.toLowerCase() === "create") {
      dispatch(createNote(note));
    }
    if (action.toLowerCase() === "edit") {
      dispatch(updateNote(note));
    }
  };

  const deleteCategory = (category) => {
    const categories = note.categories.filter((c) => c !== category);
    setNote((prevNote) => ({ ...prevNote, categories }));
  };

  const addCategory = (e) => {
    e.preventDefault();
    if (!category) return;

    if (note.categories.includes(category)) {
      toast.error(`The category "${category}" already exist`);
    } else {
      const categories = [...note.categories, category];
      setNote((prevNote) => ({ ...prevNote, categories }));
      setCategory("");
    }
  };

  return (
    <div className="flex h-full w-full flex-col justify-center p-5">
      <section className="">
        <h2 className="mb-10 text-5xl">{action} note</h2>
      </section>
      {isLoading ? (
        <Spinner />
      ) : (
        <section>
          <form onSubmit={onSubmit} className="flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <label className="inline-block w-1/6 font-bold">Title</label>
              <input
                className="m-0 grow rounded-lg border border-solid border-gray-300 px-3 py-3 text-base font-normal text-gray-700 transition ease-in-out focus:border-amber-500 focus:outline-none"
                type="text"
                placeholder="Enter a title"
                value={note.title}
                onChange={(e) =>
                  setNote((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </div>
            <div className="flex gap-2">
              <label className="inline-block w-1/6 pt-2 font-bold">
                Content
              </label>
              <textarea
                className="m-0 h-36 min-h-[9rem] grow rounded-lg border border-solid border-gray-300 px-3 py-3 text-base font-normal text-gray-700 transition ease-in-out focus:border-amber-500 focus:outline-none"
                placeholder="Add some details..."
                value={note.content}
                onChange={(e) =>
                  setNote((prev) => ({ ...prev, content: e.target.value }))
                }
              />
            </div>
            <div className="mb-2 flex gap-3">
              <label className="inline-block w-1/6 pt-2 font-bold">
                Categories
              </label>
              <div className="flex w-full grow flex-col">
                <div className="mb-3 flex h-24 grow flex-wrap items-start gap-2 overflow-auto rounded-lg border border-solid bg-white p-2">
                  {note.categories.map((category) => (
                    <Category
                      key={category}
                      deleteCategory={deleteCategory}
                      category={category}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-5">
                  <input
                    className="m-0 grow rounded-lg border border-solid border-gray-300 px-3 py-3 text-base font-normal text-gray-700 transition ease-in-out focus:border-amber-500 focus:outline-none"
                    type="text"
                    placeholder="Add category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  <button
                    className="inline-block rounded-lg border-2 border-gray-900 px-6 py-3 text-sm font-medium uppercase leading-tight text-gray-900 transition duration-100 ease-in-out hover:bg-amber-600 hover:bg-opacity-50 focus:outline-none focus:ring-0"
                    onClick={addCategory}
                  >
                    Add category
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-5">
              <button
                className="inline-block rounded-lg border-2 border-gray-900 px-6 py-3 text-sm font-medium uppercase leading-tight text-gray-900 transition duration-100 ease-in-out hover:bg-amber-600 hover:bg-opacity-50 focus:outline-none focus:ring-0"
                onClick={() => closeModal()}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-block rounded-lg border-2 border-gray-900 px-6 py-3 text-sm font-medium uppercase leading-tight text-gray-900 transition duration-100 ease-in-out hover:bg-amber-600 hover:bg-opacity-50 focus:outline-none focus:ring-0"
              >
                Save
              </button>
            </div>
          </form>
        </section>
      )}
    </div>
  );
};
export default NoteForm;
