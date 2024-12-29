import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sections: []
};

export const sectionSlice = createSlice({
    name: "listeSections",
    initialState,
    reducers: {
        getSectionReducer: (state, action) => {
            const sections = action.payload;
            state.sections = sections;
        },
        addSectionReducer: (state, action) => {
            const section = action.payload;
            state.sections.push(section);
        }
    }
});

export const {getSectionReducer, addSectionReducer} = sectionSlice.actions;

export default sectionSlice.reducer;
