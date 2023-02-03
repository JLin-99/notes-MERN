import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNotes, reset } from "../features/notes/noteSlice";
import NewNote from "../components/NewNote";
import Spinner from "../components/Spinner";

const Board = () => {
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

  if (isLoading) return <Spinner />;

  return (
    <div className="grow">
      <h2>Board</h2>
      {/* <NewNote /> */}
    </div>
  );
};
export default Board;
