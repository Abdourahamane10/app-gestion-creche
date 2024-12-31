import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    employes: []
}

export const employeSlice = createSlice({
    name: "employes",
    initialState,
    reducers: {
        employesReducer: (state, action) => {
            const employes = action.payload;
            state.employes = employes;
        }
    }
});

export const {employesReducer} = employeSlice.actions;

export default employeSlice.reducer;
