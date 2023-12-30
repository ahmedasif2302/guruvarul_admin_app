import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { agreementsNetwork } from '../../api/network';


const initialState = {
  loading: false,
  crudLoading: false,
  agreements: null,
  activeAgreements: null,
  total: 0,
  error: null
};

export const fetchAgreements = createAsyncThunk(
  'fetchAgreements',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await agreementsNetwork.page(page, limit);
      return response.data.data
    } catch (error) {
      return rejectWithValue({ error })
    }
  });

export const fetchActiveAgreements = createAsyncThunk(
  'fetchActiveAgreements',
  async (_, { rejectWithValue }) => {
    try {
      const response = await agreementsNetwork.activeAgreements();
      return response.data.data
    } catch (error) {
      return rejectWithValue({ error })
    }
  });

export const addAgreement = createAsyncThunk(
  'addAgreement',
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await agreementsNetwork.add(data);
      return response.data
    } catch (error) {
      return rejectWithValue({ error })
    }
  });

export const updateAgreement = createAsyncThunk(
  'updateAgreement',
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await agreementsNetwork.update(data);
      return response.data
    } catch (error) {
      return rejectWithValue({ error })
    }
  }
)

export const deleteAgreement = createAsyncThunk(
  'deleteAgreement',
  async (id, { rejectWithValue }) => {
    try {
      const response = await agreementsNetwork.delete(id);
      return response.data
    } catch (error) {
      return rejectWithValue({ error })
    }
  }
)

export const agreementSlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase("fetchActiveAgreements/pending", (state, { payload }) => {
      state.loading = true
    });
    builder.addCase("fetchActiveAgreements/fulfilled", (state, { payload }) => {
      state.loading = false;
      state.activeAgreements = payload
      state.total = payload.count;
      state.error = null
    });
    builder.addCase("fetchActiveAgreements/rejected", (state, { payload }) => {
      state.loading = false;
      state.activeAgreements = null;
      state.error = payload
    });

    builder.addCase("fetchAgreements/pending", (state, { payload }) => {
      state.loading = true
    });
    builder.addCase("fetchAgreements/fulfilled", (state, { payload }) => {
      state.loading = false;
      state.agreements = payload.rows.map((row) => {
        row['key'] = row.id;
        return row;
      });
      state.total = payload.count;
      state.error = null
    });
    builder.addCase("fetchAgreements/rejected", (state, { payload }) => {
      state.loading = false;
      state.agreements = null;
      state.error = payload
    });

    builder.addCase("addAgreement/pending", (state, { payload }) => {
      state.crudLoading = true
    });
    builder.addCase("addAgreement/fulfilled", (state, { payload }) => {
      state.crudLoading = false;
      state.error = null
    });
    builder.addCase("addAgreement/rejected", (state, { payload }) => {
      state.crudLoading = false;
      state.error = payload
    });

    builder.addCase("updateAgreement/pending", (state, { payload }) => {
      state.crudLoading = true
    });
    builder.addCase("updateAgreement/fulfilled", (state, { payload }) => {
      state.crudLoading = false;
      state.error = null
    });
    builder.addCase("updateAgreement/rejected", (state, { payload }) => {
      state.crudLoading = false;
      state.error = payload
    });

    builder.addCase("deleteAgreement/pending", (state, { payload }) => {
      state.crudLoading = true
    });
    builder.addCase("deleteAgreement/fulfilled", (state, { payload }) => {
      state.crudLoading = false;
      state.error = null
    });
    builder.addCase("deleteAgreement/rejected", (state, { payload }) => {
      state.crudLoading = false;
      state.error = payload
    });
  }

});

export default agreementSlice.reducer;