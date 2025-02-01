import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    parents: []
}

export const parentSlice = createSlice({
    name: "parents",
    initialState,
    reducers: {
        setParentsReducer: (state, action) => {
            const parents = action.payload;
            state.parents = parents;
        }
    }
});

export const {setParentsReducer} = parentSlice.actions;

export default parentSlice.reducer;
