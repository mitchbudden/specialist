import { combineReducers } from "redux";
import user from "./ReducerUser";
import lists from "./ReducerLists";

export default combineReducers({
    user,
    lists
});
