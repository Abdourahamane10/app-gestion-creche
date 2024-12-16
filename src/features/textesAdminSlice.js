import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: 1,
    presentationTexte: "",
    projetPedagogiqueTexte: "",
    reglementTexte: ""
}

export const textesAdminSlice = createSlice({
    name: "textesAdmin",
    initialState,
    reducers: {
        idReducer: (state, action) => {
            const idParametresGeneraux = action.payload;
            state.id = idParametresGeneraux;
        },
        presentationReducer: (state, action) => {
            const presentationTexte = action.payload;
            state.presentationTexte = presentationTexte;
        },
        projetPedagogiqueReducer: (state, action) => {
            const projetPedagogiqueTexte = action.payload;
            state.projetPedagogiqueTexte = projetPedagogiqueTexte;
        },
        reglementReducer: (state, action) => {
            const reglementTexte = action.payload;
            state.reglementTexte = reglementTexte;
        }
    }
});

export const {idReducer, presentationReducer, projetPedagogiqueReducer, reglementReducer} = textesAdminSlice.actions;

export default textesAdminSlice.reducer;
