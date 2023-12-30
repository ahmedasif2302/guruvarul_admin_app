import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import agreementSlice from '../pages/agreement/AgreementSlice';
import categorySlice from "../pages/categories/CategorySlice";
import loginSlice from '../pages/login/LoginSlice';
import propertySlice from "../pages/property/propertySlice";
import todoSlice from '../pages/todos/TodoSlice';


const loginPersistConfig = {
    key: 'property',
    storage,
}

const rootReducer = combineReducers({
    login: loginSlice,
    property: propertySlice,
    category: categorySlice,
    tasks: todoSlice,
    agreements: agreementSlice
});

export default rootReducer;