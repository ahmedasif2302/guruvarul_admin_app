import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { categoriesNetwork } from '../../api/network';


const initialState = {
  loading: false,
  crudLoading: false,
  categories: null,
  activeCategories: null,
  total: 0,
  error: null
};

export const fetchCategories = createAsyncThunk(
  'fetchCategories',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await categoriesNetwork.page(page, limit);
      return response.data.data
    } catch (error) {
      return rejectWithValue({ error })
    }
  });

export const fetchActiveCategories = createAsyncThunk(
  'fetchActiveCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await categoriesNetwork.activeCategories();
      return response.data.data
    } catch (error) {
      return rejectWithValue({ error })
    }
  });

export const addCategory = createAsyncThunk(
  'addCategory',
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await categoriesNetwork.add(data);
      return response.data
    } catch (error) {
      return rejectWithValue({ error })
    }
  });

export const updateCategory = createAsyncThunk(
  'updateCategory',
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await categoriesNetwork.update(data);
      return response.data
    } catch (error) {
      return rejectWithValue({ error })
    }
  }
)

export const deleteCategory = createAsyncThunk(
  'deleteCategory',
  async (id, { rejectWithValue }) => {
    try {
      const response = await categoriesNetwork.delete(id);
      return response.data
    } catch (error) {
      return rejectWithValue({ error })
    }
  }
)

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase("fetchActiveCategories/pending", (state, { payload }) => {
      state.loading = true
    });
    builder.addCase("fetchActiveCategories/fulfilled", (state, { payload }) => {
      state.loading = false;
      state.activeCategories = payload
      state.total = payload.count;
      state.error = null
    });
    builder.addCase("fetchActiveCategories/rejected", (state, { payload }) => {
      state.loading = false;
      state.activeCategories = null;
      state.error = payload
    });

    builder.addCase("fetchCategories/pending", (state, { payload }) => {
      state.loading = true
    });
    builder.addCase("fetchCategories/fulfilled", (state, { payload }) => {
      state.loading = false;
      state.categories = payload.rows.map((row) => {
        row['key'] = row.id;
        return row;
      });
      state.total = payload.count;
      state.error = null
    });
    builder.addCase("fetchCategories/rejected", (state, { payload }) => {
      state.loading = false;
      state.categories = null;
      state.error = payload
    });

    builder.addCase("addCategory/pending", (state, { payload }) => {
      state.crudLoading = true
    });
    builder.addCase("addCategory/fulfilled", (state, { payload }) => {
      state.crudLoading = false;
      state.error = null
    });
    builder.addCase("addCategory/rejected", (state, { payload }) => {
      state.crudLoading = false;
      state.error = payload
    });

    builder.addCase("updateCategory/pending", (state, { payload }) => {
      state.crudLoading = true
    });
    builder.addCase("updateCategory/fulfilled", (state, { payload }) => {
      state.crudLoading = false;
      state.error = null
    });
    builder.addCase("updateCategory/rejected", (state, { payload }) => {
      state.crudLoading = false;
      state.error = payload
    });

    builder.addCase("deleteCategory/pending", (state, { payload }) => {
      state.crudLoading = true
    });
    builder.addCase("deleteCategory/fulfilled", (state, { payload }) => {
      state.crudLoading = false;
      state.error = null
    });
    builder.addCase("deleteCategory/rejected", (state, { payload }) => {
      state.crudLoading = false;
      state.error = payload
    });
  }

});

export default categorySlice.reducer;