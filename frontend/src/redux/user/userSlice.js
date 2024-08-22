import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, logout, profile, register } from "../../api/user";

const initialState = {
    authorized: false,
    user: null,
    status: "idle",
    error: null,
};

const userSlice = createSlice({
    name: "user",
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
            .addCase(userLogin.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.authorized = true;
                state.status = "succeeded";
                state.user = action.payload.data.user;
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.authorized = false;
                state.error = action.payload;
                state.status = "failed";
            })

            .addCase(userRegister.pending, (state) => {
                state.error = null;
                state.status = "loading";
            })
            .addCase(userRegister.fulfilled, (state, action) => {
                state.authorized = true;
                state.status = "succeeded";
                state.user = action.payload.data.user;
            })
            .addCase(userRegister.rejected, (state, action) => {
                state.authorized = false;
                state.error = action.payload;
                state.status = "failed";
            })

            .addCase(userLogout.pending, (state) => {
                state.error = null;
                state.status = "loading";
            })
            .addCase(userLogout.fulfilled, (state) => {
                state.authorized = false;
                state.status = "succeeded";
                state.user = null;
            })
            .addCase(userLogout.rejected, (state, action) => {
                state.error = action.payload;
                state.status = "failed";
            })

            .addCase(userProfile.pending, (state) => {
                state.error = null;
                state.status = "loading";
            })
            .addCase(userProfile.fulfilled, (state, action) => {
                state.authorized = true;
                state.status = "succeeded";
                state.user = action.payload.data;
            })
            .addCase(userProfile.rejected, (state, action) => {
                state.authorized = false;
                state.error = action.payload;
                state.status = "failed";
                state.user = null;
            });
    },
});

const userLogin = createAsyncThunk(
    "user/login",
    async (credentials, { rejectWithValue }) => {
        try {
            return await login(credentials);
        } catch (error) {
            return rejectWithValue(error);
        } /*  */
    }
);

const userRegister = createAsyncThunk(
    "user/register",
    async (credentials, { rejectWithValue }) => {
        try {
            return await register(credentials);
        } catch (error) {
            return rejectWithValue(error);
        } /*  */
    }
);

const userLogout = createAsyncThunk(
    "user/logout",
    async (_, { rejectWithValue }) => {
        try {
            return await logout();
        } catch (error) {
            return rejectWithValue(error);
        } /*  */
    }
);

const userProfile = createAsyncThunk(
    "user/profile",
    async (_, { rejectWithValue }) => {
        try {
            return await profile();
        } catch (error) {
            return rejectWithValue(error);
        } /*  */
    }
);

const { resetStatus, resetError } = userSlice.actions;

export {
    userLogin,
    userRegister,
    userLogout,
    userProfile,
    resetStatus,
    resetError,
};

export default userSlice.reducer;
