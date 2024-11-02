import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    token: localStorage.getItem('accessToken') || null
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginReducer: (state, action) => {
            //Quand cette action sera envoyée, on va mettre à jour le token dans le redux et dans le localStorage du navigateur
            state.token = action.payload;
            localStorage.setItem('accessToken', action.payload);
        },
        logoutReducer: (state) => {
            state.token = null;
            localStorage.removeItem('accessToken');
        }
    }
});

export const { loginReducer, logoutReducer } = authSlice.actions;

export default authSlice.reducer;
