import {RolesResponse} from "../../types";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getRoles} from "../../api/vw-api";

interface RolesState {
    data: RolesResponse | null;
    loading: boolean;
    error: string | null;
    lastFetched: number | null;
}

const initialState: RolesState = {
    data: null,
    loading: false,
    error: null,
    lastFetched: null,
};

export const fetchRoles = createAsyncThunk('roles/fetchRoles', async () => {
    const response = await getRoles();
    return response;
});

const rolesSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRoles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRoles.fulfilled, (state, action: PayloadAction<RolesResponse>) => {
                state.loading = false;
                state.data = action.payload;
                state.lastFetched = Date.now();
            })
            .addCase(fetchRoles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch roles';
            });
    },
});

export default rolesSlice.reducer;