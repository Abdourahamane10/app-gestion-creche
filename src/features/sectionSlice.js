const initialState = {
    sections: []
};

import { createSlice } from "@reduxjs/toolkit";

export const sectionSlice = createSlice({
    name: "listeSections",
    initialState,
    reducers: {
        sectionReducer: (state, action) => {
            const sections = action.payload;
            state.sections = sections;
        }
    }
});

export const {sectionReducer} = sectionSlice.actions;

export default sectionSlice.reducer;
