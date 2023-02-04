import axios from "axios";

const API_URL = "/api/notes/";

const createNote = async (noteData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, noteData, config);

  return response.data;
};

const getNotes = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

const updateNote = async (noteData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const updatedNote = {
    title: noteData.title,
    content: noteData.content,
    archived: noteData.archived,
    categories: noteData.categories,
  };

  const response = await axios.put(API_URL + noteData._id, updatedNote, config);

  return response.data;
};

const deleteNote = async (noteId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + noteId, config);

  return response.data;
};

const noteService = {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
};
export default noteService;
