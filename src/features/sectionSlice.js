import { createSlice } from "@reduxjs/toolkit";

const storedIdSectionActive = localStorage.getItem("idSectionActive");

const initialState = {
    sections: [],
    idSectionSelected: storedIdSectionActive ? Number(storedIdSectionActive) : 0
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
        },
        setIdSectionSelectedReducer: (state, action) => {
            const idSectionCourante = action.payload;
            state.idSectionSelected = idSectionCourante;
            localStorage.setItem("idSectionActive", action.payload);
        }
    }
});

export const {getSectionReducer, addSectionReducer, setIdSectionSelectedReducer} = sectionSlice.actions;

export default sectionSlice.reducer;
