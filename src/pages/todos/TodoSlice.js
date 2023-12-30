import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { taskNetwork } from '../../api/network';

const initialState = {
  loading: false,
  crudLoading: false,
  tasks: null,
  activeProperties: null,
  total: 0,
  reports: null,
  error: null
}

export const fetchTasks = createAsyncThunk(
  'fetchTasks',
  async ({ page, limit, filter }, { rejectWithValue }) => {
    try {
      const response = await taskNetwork.page(page, limit, filter);
      return response.data.data;
    } catch (error) {
      return rejectWithValue({ error })
    }
  });

export const addTodo = createAsyncThunk(
  'addTodo',
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await taskNetwork.add(data);
      return response.data
    } catch (error) {
      return rejectWithValue({ error })
    }
  });

export const updateTodo = createAsyncThunk(
  'updateTodo',
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await taskNetwork.update(data);
      return response.data
    } catch (error) {
      return rejectWithValue({ error })
    }
  }
)

export const deleteTodo = createAsyncThunk(
  'deleteTodo',
  async (id, { rejectWithValue }) => {
    try {
      const response = await taskNetwork.delete(id);
      return response.data
    } catch (error) {
      return rejectWithValue({ error })
    }
  }
)

export const exportTodo = createAsyncThunk(
  'exportTodo',
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await taskNetwork.export(data);
      return response.data
    } catch (error) {
      return rejectWithValue({ error })
    }
  }
)

export const fetchReports = createAsyncThunk(
  'fetchReports',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await taskNetwork.download(page, limit);
      return response.data.data
    } catch (error) {
      return rejectWithValue({ error })
    }
  }
);

export const deleteExport = createAsyncThunk(
  'deleteExport',
  async (id, { rejectWithValue }) => {
    try {
      const response = await taskNetwork.deleteExport(id);
      return response.data.data
    } catch (error) {
      return rejectWithValue({ error })
    }
  }
)

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    resetTaskState(state, { payload }) {
      state.crudLoading = false;
      state.loading = false;
      state.total = 0;
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase("fetchTasks/pending", (state, { payload }) => {
      state.loading = true
    });
    builder.addCase("fetchTasks/fulfilled", (state, { payload }) => {
      state.loading = false;
      state.tasks = payload.rows.map((row) => {
        row['key'] = row.id;
        return row;
      });
      state.total = payload.count;
      state.error = null
    });
    builder.addCase("fetchTasks/rejected", (state, { payload }) => {
      state.loading = false;
      state.tasks = null;
      state.error = payload
    });

    builder.addCase("addTodo/pending", (state, { payload }) => {
      state.crudLoading = true
    });
    builder.addCase("addTodo/fulfilled", (state, { payload }) => {
      state.crudLoading = false;
      state.error = null
    });
    builder.addCase("addTodo/rejected", (state, { payload }) => {
      state.crudLoading = false;
      state.error = payload
    });

    builder.addCase("updateTodo/pending", (state, { payload }) => {
      state.crudLoading = true
    });
    builder.addCase("updateTodo/fulfilled", (state, { payload }) => {
      state.crudLoading = false;
      state.error = null
    });
    builder.addCase("updateTodo/rejected", (state, { payload }) => {
      state.crudLoading = false;
      state.error = payload
    });

    builder.addCase("deleteTodo/pending", (state, { payload }) => {
      state.crudLoading = true;
    });
    builder.addCase("deleteTodo/fulfilled", (state, { payload }) => {
      state.crudLoading = false;
      state.error = null;
    });
    builder.addCase("deleteTodo/rejected", (state, { payload }) => {
      state.crudLoading = false;
      state.error = payload
    });

    builder.addCase("fetchReports/pending", (state, { payload }) => {
      state.loading = true;
      state.reports = payload;
      state.error = null;
    });
    builder.addCase("fetchReports/fulfilled", (state, { payload }) => {
      state.loading = false;
      state.reports = payload.rows;
      state.total = payload.count;
      state.error = null;
    });
    builder.addCase("fetchReports/rejected", (state, { payload }) => {
      state.loading = false;
      state.reports = null;
      state.error = payload
    });

    builder.addCase("exportTodo/pending", (state, { payload }) => {
      state.crudLoading = true;
      state.error = null;
    });
    builder.addCase("exportTodo/fulfilled", (state, { payload }) => {
      state.crudLoading = false;
      state.error = null;
    });
    builder.addCase("exportTodo/rejected", (state, { payload }) => {
      state.crudLoading = false;
      state.error = payload
    });
  }
});




export const { resetTaskState } = todoSlice.actions;

// this is for configureStore
export default todoSlice.reducer;