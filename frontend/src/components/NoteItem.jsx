const NoteItem = ({ note }) => {
  return (
    <div>
      <div>Icon</div>
      <div>
        <div>{note.title}</div>
        <div>{new Date(note.createdAt).toLocaleDateString()}</div>
      </div>
      <div>
        <button>Archive</button>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
};
export default NoteItem;
