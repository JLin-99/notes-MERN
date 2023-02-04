import { AiFillTag } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";

const Category = ({ category, deleteCategory }) => {
  return (
    <div className="m-0 flex w-fit items-center justify-center rounded-lg border border-solid border-gray-300 px-2 py-1 text-base font-normal text-gray-700">
      <AiFillTag />
      <div>{category}</div>
      <RxCross2
        onClick={() => deleteCategory(category)}
        className="ml-2 cursor-pointer"
      />
    </div>
  );
};
export default Category;
