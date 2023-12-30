import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { propertiesNetwork } from '../../api/network';

const initialState = {
  loading: false,
  crudLoading: false,
  properties: null,
  activeProperties: null,
  total: 0,
  error: null
}

export const fetchProperties = createAsyncThunk(
  'fetchProperties',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await propertiesNetwork.page(page, limit);
      return response.data.data
    } catch (error) {
      return rejectWithValue({ error })
    }
  });

export const fetchActiveProperties = createAsyncThunk(
  'fetchActiveProperties',
  async (_, { rejectWithValue }) => {
    try {
      const response = await propertiesNetwork.activeProperties();
      return response.data.data
    } catch (error) {
      console.log(error)
      return rejectWithValue({ error })
    }
  });

export const addProperty = createAsyncThunk(
  'addProperty',
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await propertiesNetwork.add(data);
      return response.data
    } catch (error) {
      return rejectWithValue({ error })
    }
  });

export const updateProperty = createAsyncThunk(
  'updateProperty',
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await propertiesNetwork.update(data);
      return response.data
    } catch (error) {
      return rejectWithValue({ error })
    }
  }
);

export const deleteProperty = createAsyncThunk(
  'deleteProperty',
  async (id, { rejectWithValue }) => {
    try {
      const response = await propertiesNetwork.delete(id);
      return response.data
    } catch (error) {
      return rejectWithValue({ error })
    }
  }
)

export const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase("fetchActiveProperties/pending", (state, { payload }) => {
      state.loading = true
    });
    builder.addCase("fetchActiveProperties/fulfilled", (state, { payload }) => {
      state.loading = false;
      state.activeProperties = payload
      state.error = null
    });
    builder.addCase("fetchActiveProperties/rejected", (state, { payload }) => {
      state.loading = false;
      state.activeProperties = null;
      state.error = payload
    });

    builder.addCase("fetchProperties/pending", (state, { payload }) => {
      state.loading = true
    });
    builder.addCase("fetchProperties/fulfilled", (state, { payload }) => {
      state.loading = false;
      state.properties = payload.rows.map((row) => {
        row['key'] = row.id;
        return row;
      });
      state.total = payload.count;
      state.error = null
    });
    builder.addCase("fetchProperties/rejected", (state, { payload }) => {
      state.loading = false;
      state.properties = null;
      state.error = payload
    });

    builder.addCase("addProperty/pending", (state, { payload }) => {
      state.crudLoading = true
    });
    builder.addCase("addProperty/fulfilled", (state, { payload }) => {
      state.crudLoading = false;
      state.error = null
    });
    builder.addCase("addProperty/rejected", (state, { payload }) => {
      state.crudLoading = false;
      state.error = payload
    });

    builder.addCase("updateProperty/pending", (state, { payload }) => {
      state.crudLoading = true
    });
    builder.addCase("updateProperty/fulfilled", (state, { payload }) => {
      state.crudLoading = false;
      state.error = null
    });
    builder.addCase("updateProperty/rejected", (state, { payload }) => {
      state.crudLoading = false;
      state.error = payload
    });

    builder.addCase("deleteProperty/pending", (state, { payload }) => {
      state.crudLoading = true
    });
    builder.addCase("deleteProperty/fulfilled", (state, { payload }) => {
      state.crudLoading = false;
      state.error = null
    });
    builder.addCase("deleteProperty/rejected", (state, { payload }) => {
      state.crudLoading = false;
      state.error = payload
    });

  }
});

// this is for dispatch

// export const { addTodo } = propertySlice.actions;

// this is for configureStore
export default propertySlice.reducer;