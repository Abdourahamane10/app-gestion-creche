import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    token: localStorage.getItem('accessToken') || null,
    codeUser: localStorage.getItem('codeUser') || null,
    userConnected: localStorage.getItem('userConnected') ? JSON.parse(localStorage.getItem('userConnected')) : null
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginReducer: (state, action) => {
            //Quand cette action sera envoyée, on va mettre à jour le token et le code_user dans le redux et dans le localStorage du navigateur
            const {token, codeUser, userConnected} = action.payload;
            state.token = token;
            state.codeUser = codeUser;
            state.userConnected = userConnected;
            localStorage.setItem('accessToken', token);
            localStorage.setItem('codeUser', codeUser);
            localStorage.setItem('userConnected', JSON.stringify(userConnected));
        },
        logoutReducer: (state) => {
            state.token = null;
            state.codeUser = null;
            state.userConnected = null;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('codeUser');
            localStorage.removeItem('userConnected');
        }
    }
});

export const { loginReducer, logoutReducer } = authSlice.actions;

export default authSlice.reducer;
