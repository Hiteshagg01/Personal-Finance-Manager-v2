import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    loginUser,
    registerUser,
    logoutUser,
    getUserProfile,
} from "../../api/user";

const initialState = {
    user: null,
    authenticated: false,
    status: "idle",
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetError: (state) => {
            state.error = null;
        },
        resetStatus: (state) => {
            state.status = "idle";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state) => {
                state.error = null;
                state.status = "loading";
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.authenticated = true;
                state.status = "succeeded";
                state.user = action.payload.data.user;
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.error = action.payload;
                state.status = "failed";
            })

            .addCase(userRegister.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(userRegister.fulfilled, (state, action) => {
                state.authenticated = true;
                state.status = "succeeded";
                state.user = action.payload.data.user;
            })
            .addCase(userRegister.rejected, (state, action) => {
                state.error = action.payload;
                state.status = "failed";
            })

            .addCase(userLogout.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(userLogout.fulfilled, (state) => {
                state.authenticated = false;
                state.status = "succeeded";
                state.user = null;
            })
            .addCase(userLogout.rejected, (state, action) => {
                state.error = action.payload;
                state.status = "failed";
            })

            .addCase(userProfile.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(userProfile.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.authenticated = true;
                state.user = action.payload.data;
            })
            .addCase(userProfile.rejected, (state, action) => {
                state.error = action.payload;
                state.status = "failed";
            });
    },
});

const userLogin = createAsyncThunk(
    "user/login",
    async (credentials, { rejectWithValue }) => {
        try {
            return await loginUser(credentials);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const userRegister = createAsyncThunk(
    "user/register",
    async (credentials, { rejectWithValue }) => {
        try {
            return await registerUser(credentials);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const userLogout = createAsyncThunk(
    "user/logout",
    async (_, { rejectWithValue }) => {
        try {
            return await logoutUser();
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const userProfile = createAsyncThunk(
    "user/profile",
    async (_, { rejectWithValue }) => {
        try {
            return await getUserProfile();
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const { resetError, resetStatus } = userSlice.actions;

export { userLogin, userRegister, userLogout, userProfile };

export default userSlice.reducer;
