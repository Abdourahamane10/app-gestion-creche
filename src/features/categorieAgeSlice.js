import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  categoriesAge: []  
}

export const categoriesAgeSlice = createSlice({
    name: "categoriesAge",
    initialState,
    reducers: {
        setCategoriesAgeReducer: (state, action) => {
            const categories = action.payload;
            state.categoriesAge = categories;
        }
    }
});

export const {setCategoriesAgeReducer} = categoriesAgeSlice.actions;

export default categoriesAgeSlice.reducer;
