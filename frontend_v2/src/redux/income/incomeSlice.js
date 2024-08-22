import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    addIncome,
    getAllIncomes,
    getCurrentIncomes,
    getIncomeById,
    removeIncome,
    updateIncome,
} from "../../api/income";

const initialState = {
    all: [],
    current: [],
    detail: {},
    status: "idle",
    error: null,
};

const incomeSlice = createSlice({
    name: "income",
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.status = "idle";
        },
        resetError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(incomeAll.pending, (state) => {
                state.error = null;
                state.status = "loading";
            })
            .addCase(incomeAll.fulfilled, (state, action) => {
                state.all = action.payload.data.rows;
                state.status = "succeeded";
            })
            .addCase(incomeAll.rejected, (state, action) => {
                state.error = action.payload;
                state.status = "failed";
            })

            .addCase(incomeCurrent.pending, (state) => {
                state.status = "pending";
                state.error = null;
            })
            .addCase(incomeCurrent.fulfilled, (state, action) => {
                state.current = action.payload.data.rows;
                state.status = "succeeded";
            })
            .addCase(incomeCurrent.rejected, (state, action) => {
                state.error = action.payload;
                state.status = "failed";
            })

            .addCase(incomeAdd.pending, (state) => {
                state.error = null;
                state.status = "loading";
            })
            .addCase(incomeAdd.fulfilled, (state, action) => {
                state.current.push(action.payload.data);
                state.all.push(action.payload.data);
                state.status = "succeeded";
            })
            .addCase(incomeAdd.rejected, (state, action) => {
                state.error = action.payload;
                state.status = "failed";
            })

            .addCase(incomeUpdate.pending, (state) => {
                state.error = null;
                state.status = "loading";
            })
            .addCase(incomeUpdate.fulfilled, (state, action) => {
                state.current = state.current.map((income) =>
                    income.id === action.payload.data.id
                        ? action.payload.data
                        : income
                );
                state.all = state.all.map((income) =>
                    income.id === action.payload.data.id
                        ? action.payload.data
                        : income
                );
                state.status = "succeeded";
            })
            .addCase(incomeUpdate.rejected, (state, action) => {
                state.error = action.payload;
                state.status = "failed";
            })

            .addCase(incomeDelete.pending, (state) => {
                state.error = null;
                state.status = "loading";
            })
            .addCase(incomeDelete.fulfilled, (state, action) => {
                state.current = state.current.filter(
                    (income) => income.id !== action.meta.arg
                );
                state.all = state.all.filter(
                    (income) => income.id !== action.meta.arg
                );
                state.status = "succeeded";
            })
            .addCase(incomeDelete.rejected, (state, action) => {
                state.error = action.payload;
                state.status = "failed";
            })

            .addCase(incomeDetail.pending, (state) => {
                state.error = null;
                state.status = "loading";
            })
            .addCase(incomeDetail.fulfilled, (state, action) => {
                state.detail = action.payload.data;
                state.status = "succeeded";
            })
            .addCase(incomeDetail.rejected, (state, action) => {
                state.error = action.payload;
                state.status = "failed";
            });
    },
});

const incomeAll = createAsyncThunk(
    "income/getAll",
    async (_, { rejectWithValue, dispatch }) => {
        try {
            return await getAllIncomes();
        } catch (error) {
            return rejectWithValue(error);
        } finally {
            setTimeout(() => dispatch(resetStatus()), 3000);
        }
    }
);

const incomeCurrent = createAsyncThunk(
    "income/current",
    async (_, { rejectWithValue, dispatch }) => {
        try {
            return await getCurrentIncomes();
        } catch (error) {
            return rejectWithValue(error);
        } finally {
            setTimeout(() => dispatch(resetStatus()), 3000);
        }
    }
);

const incomeAdd = createAsyncThunk(
    "income/add",
    async (payload, { rejectWithValue, dispatch }) => {
        try {
            return await addIncome(payload);
        } catch (error) {
            return rejectWithValue(error);
        } finally {
            setTimeout(() => dispatch(resetStatus()), 3000);
        }
    }
);

const incomeDetail = createAsyncThunk(
    "income/detail",
    async (id, { rejectWithValue, dispatch }) => {
        try {
            return await getIncomeById(id);
        } catch (error) {
            return rejectWithValue(error);
        } finally {
            setTimeout(() => dispatch(resetStatus()), 3000);
        }
    }
);

const incomeUpdate = createAsyncThunk(
    "income/update",
    async ({ id, payload }, { rejectWithValue, dispatch }) => {
        try {
            return await updateIncome(id, payload);
        } catch (error) {
            return rejectWithValue(error);
        } finally {
            setTimeout(() => dispatch(resetStatus()), 3000);
        }
    }
);

const incomeDelete = createAsyncThunk(
    "income/delete",
    async (id, { rejectWithValue, dispatch }) => {
        try {
            return await removeIncome(id);
        } catch (error) {
            return rejectWithValue(error);
        } finally {
            setTimeout(() => dispatch(resetStatus()), 3000);
        }
    }
);

export const { resetStatus, resetError } = incomeSlice.actions;
export {
    incomeAdd,
    incomeAll,
    incomeCurrent,
    incomeDelete,
    incomeDetail,
    incomeUpdate,
};
export default incomeSlice.reducer;
