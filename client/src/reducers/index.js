import { combineReducers } from "redux";
import { customerReducer } from "./customer.reducer"

export const rootReducer = combineReducers({
    customer: customerReducer,
})