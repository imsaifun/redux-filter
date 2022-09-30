import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../utils/axios";

const initialState = {
    tags: [],
    isLoading: false,
    isError: false,
    error: ""
}

export const getTags = async () => {
    const response = await axios.get('/tags');
    return response.data
}

// async thunk
export const fetchTags = createAsyncThunk('tags/fetchTags',
    async () => {
        const tags = await getTags()
        return tags;
    })

const tagsSlice = createSlice({
    name: "tags",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchTags.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(fetchTags.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tags = action.payload
            })
            .addCase(fetchTags.rejected, (state, action) => {
                state.isLoading = false;
                state.tags = [];
                state.isError = true;
                state.error = action.error?.message
            })
    }
})

export default tagsSlice.reducer;