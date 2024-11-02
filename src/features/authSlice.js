import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    token: localStorage.getItem('accessToken') || null,
    codeUser: localStorage.getItem('codeUser') || null
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginReducer: (state, action) => {
            //Quand cette action sera envoyée, on va mettre à jour le token et le code_user dans le redux et dans le localStorage du navigateur
            const {token, codeUser} = action.payload;
            state.token = token;
            state.codeUser = codeUser;
            localStorage.setItem('accessToken', token);
            localStorage.setItem('codeUser', codeUser);
        },
        logoutReducer: (state) => {
            state.token = null;
            state.codeUser = null;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('codeUser');
        }
    }
});

export const { loginReducer, logoutReducer } = authSlice.actions;

export default authSlice.reducer;
