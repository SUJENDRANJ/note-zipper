import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API = import.meta.env.VITE_API_BASE_URL;
console.log(API);

const authHeader = (getState) => {
  const { auth } = getState();
  return {
    Authorization: `Bearer ${auth.userInfo.token}`,
    "Content-Type": "application/json",
  };
};

/* GET ALL NOTES */
export const fetchNotes = createAsyncThunk(
  "notes/fetchAll",
  async (_, { getState, rejectWithValue }) => {
    try {
      const res = await fetch(`${API}/api/notes`, {
        headers: authHeader(getState),
      });

      if (!res.ok) throw new Error("Failed to fetch notes");
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

/* GET ONE NOTE */
export const fetchNoteById = createAsyncThunk(
  "notes/fetchOne",
  async (id, { getState, rejectWithValue }) => {
    try {
      const res = await fetch(`${API}/api/notes/${id}`, {
        headers: authHeader(getState),
      });

      if (!res.ok) throw new Error("Failed to fetch note");
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

/* CREATE NOTE */
export const createNote = createAsyncThunk(
  "notes/create",
  async (noteData, { getState, rejectWithValue }) => {
    try {
      const res = await fetch(`${API}/api/notes/create`, {
        method: "POST",
        headers: authHeader(getState),
        body: JSON.stringify(noteData),
      });

      if (!res.ok) throw new Error("Failed to create note");
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

/* UPDATE NOTE */
export const updateNote = createAsyncThunk(
  "notes/update",
  async ({ id, title, content, category }, { getState, rejectWithValue }) => {
    try {
      const res = await fetch(`${API}/api/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...authHeader(getState),
        },
        body: JSON.stringify({ title, content, category }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to update note");
      }

      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

/* DELETE NOTE */
export const deleteNote = createAsyncThunk(
  "notes/delete",
  async (id, { getState, rejectWithValue }) => {
    try {
      const res = await fetch(`${API}/api/notes/${id}`, {
        method: "DELETE",
        headers: authHeader(getState),
      });

      if (!res.ok) throw new Error("Failed to delete note");
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const notesSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [],
    currentNote: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentNote: (state) => {
      state.currentNote = null;
    },
  },
  extraReducers: (builder) => {
    builder

      /* ---------- GET ALL NOTES ---------- */
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- GET ONE NOTE ---------- */
      .addCase(fetchNoteById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNoteById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentNote = action.payload;
      })
      .addCase(fetchNoteById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- CREATE NOTE ---------- */
      .addCase(createNote.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.loading = false;
        state.notes.unshift(action.payload); // no refetch needed
      })
      .addCase(createNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- UPDATE NOTE ---------- */
      .addCase(updateNote.fulfilled, (state, action) => {
        state.notes = state.notes.map((note) =>
          note._id === action.payload._id ? action.payload : note,
        );

        if (state.currentNote?._id === action.payload._id) {
          state.currentNote = action.payload;
        }
      })

      /* ---------- DELETE NOTE ---------- */
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter((note) => note._id !== action.payload);
      });
  },
});

export const { clearCurrentNote } = notesSlice.actions;
export default notesSlice.reducer;
