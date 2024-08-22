import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    addInvestment,
    deleteInvestment,
    getAllInvestments,
    getInvestmentById,
    updateInvestment,
} from "../../api/investment";

const initialState = {
    all: [],
    detail: {},
    status: "idle",
    error: null,
};

const investmentSlice = createSlice({
    name: "investment",
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.status = "idle";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(investmentFetch.pending, (state) => {
                state.error = null;
                state.status = "loading";
            })
            .addCase(investmentFetch.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.all = action.payload.data.rows;
            })
            .addCase(investmentFetch.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            .addCase(investmentAdd.pending, (state) => {
                state.error = null;
                state.status = "loading";
            })
            .addCase(investmentAdd.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.all.push(action.payload.data);
            })
            .addCase(investmentAdd.rejected, (state, action) => {
                state.error = action.payload;
                state.status = "failed";
            })
            .addCase(investmentDetails.pending, (state) => {
                state.error = null;
                state.status = "loading";
            })
            .addCase(investmentDetails.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.detail = action.payload.data;
            })
            .addCase(investmentDetails.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(investmentUpdate.pending, (state) => {
                state.error = null;
                state.status = "loading";
            })
            .addCase(investmentUpdate.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.all = state.all.map((investment) =>
                    investment.id === action.payload.data.id
                        ? action.payload.data
                        : investment
                );
            })
            .addCase(investmentUpdate.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(investmentDelete.pending, (state) => {
                state.error = null;
                state.status = "loading";
            })
            .addCase(investmentDelete.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.all = state.all.filter(
                    (investment) => investment.id !== action.meta.arg
                );
            })
            .addCase(investmentDelete.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

const investmentFetch = createAsyncThunk(
    "investment/fetch",
    async (_, { rejectWithValue, dispatch }) => {
        try {
            return await getAllInvestments();
        } catch (error) {
            return rejectWithValue(error);
        } finally {
            setTimeout(() => dispatch(resetStatus()), 3000);
        }
    }
);

const investmentAdd = createAsyncThunk(
    "investment/add",
    async (payload, { rejectWithValue, dispatch }) => {
        try {
            return await addInvestment(payload);
        } catch (error) {
            return rejectWithValue(error);
        } finally {
            setTimeout(() => dispatch(resetStatus()), 3000);
        }
    }
);

const investmentDetails = createAsyncThunk(
    "investment/detail",
    async (id, { rejectWithValue, dispatch }) => {
        try {
            return await getInvestmentById(id);
        } catch (error) {
            return rejectWithValue(error);
        } finally {
            setTimeout(() => dispatch(resetStatus()), 3000);
        }
    }
);

const investmentUpdate = createAsyncThunk(
    "investment/update",
    async ({ id, payload }, { rejectWithValue, dispatch }) => {
        try {
            return await updateInvestment(id, payload);
        } catch (error) {
            return rejectWithValue(error);
        } finally {
            setTimeout(() => dispatch(resetStatus()), 3000);
        }
    }
);

const investmentDelete = createAsyncThunk(
    "investment/delete",
    async (id, { rejectWithValue, dispatch }) => {
        try {
            return await deleteInvestment(id);
        } catch (error) {
            return rejectWithValue(error);
        } finally {
            setTimeout(() => dispatch(resetStatus()), 3000);
        }
    }
);

export {
    investmentFetch,
    investmentAdd,
    investmentDetails,
    investmentUpdate,
    investmentDelete,
};

export const { resetStatus } = investmentSlice.actions;

export default investmentSlice.reducer;
