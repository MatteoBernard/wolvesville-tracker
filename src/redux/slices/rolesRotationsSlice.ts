import {GameConfig} from "../../types";
import {getRolesRotations} from "../../utils/vw-api";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

interface RolesRotationsState {
    data: GameConfig[] | null;
    loading: boolean;
    error: string | null;
    lastFetched: number | null;
}

const initialState: RolesRotationsState = {
    data: null,
    loading: false,
    error: null,
    lastFetched: null,
};

export const fetchRolesRotations = createAsyncThunk('rolesRotations/fetchRolesRotations', async () => {
    const response = await getRolesRotations();
    return response;
});

const rolesRotationsSlice = createSlice({
    name: 'rolesRotations',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRolesRotations.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRolesRotations.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.lastFetched = Date.now();
            })
            .addCase(fetchRolesRotations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch roles rotations';
            });
    },
});

export default rolesRotationsSlice.reducer;