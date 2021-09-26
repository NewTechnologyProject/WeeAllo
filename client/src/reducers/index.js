import { combineReducers } from "redux";
import { customerReducer } from "./customer.reducer"
import { contactReducer } from "./contact.reducer"
export const rootReducer = combineReducers({
    customer: customerReducer,
    contact: contactReducer
})