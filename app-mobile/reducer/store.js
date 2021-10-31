import { createStore, combineReducers } from 'redux';
import { userReducer } from './user.reducer';
import { rootReducer } from './index';
const configureStore = () => {
    return createStore(rootReducer);
}
export default configureStore;