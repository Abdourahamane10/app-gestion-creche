import {configureStore} from '@reduxjs/toolkit'

import authReducer from './features/authSlice';
import textesAdminReducer from './features/textesAdminSlice';
import sectionsReducer from './features/sectionSlice';


export const store = configureStore({
    reducer: {
        auth: authReducer,
        textesAdmin: textesAdminReducer,
        listeSections: sectionsReducer
    }
});
