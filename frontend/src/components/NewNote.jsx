import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createNote, reset } from "../features/notes/noteSlice";
import Spinner from "./Spinner";

const NewNote = ({ closeModal }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
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
      navigate("/board");
    }

    dispatch(reset());
  }, [dispatch, isError, isSuccess, navigate, message]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createNote({ title, content }));
  };

  if (isLoading) return <Spinner />;

  return (
    <div>
      <section>
        <h2>Create New Note</h2>
      </section>
      <section>
        <form onSubmit={onSubmit}>
          <div>
            <label>Title</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter a title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label>Content</label>
            <textarea
              name="content"
              id="content"
              placeholder="Add some details..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div>
            <div>
              <label>Categories</label>
              <textarea name="categories" id="categories" />
            </div>
            <div>
              <input type="text" name="category" id="category" />
              <button onClick={() => closeModal()}>Add</button>
            </div>
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </section>
    </div>
  );
};
export default NewNote;
