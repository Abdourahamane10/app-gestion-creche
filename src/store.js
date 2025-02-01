import {configureStore} from '@reduxjs/toolkit'

import authReducer from './features/authSlice';
import textesAdminReducer from './features/textesAdminSlice';
import sectionsReducer from './features/sectionSlice';
import employesReducer from './features/employeSlice';
import categoriAgeReducer from './features/categorieAgeSlice';
import parentsReducer from './features/parentSlice';


export const store = configureStore({
    reducer: {
        auth: authReducer,
        textesAdmin: textesAdminReducer,
        listeSections: sectionsReducer,
        employes:  employesReducer,
        categoriesAge: categoriAgeReducer,
        parents: parentsReducer
    }
});
