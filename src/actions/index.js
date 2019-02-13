import { SIGNED_IN, SET_LISTS } from "../constants";

export function logUser(email) {
    const action = {
        type: SIGNED_IN,
        email
    };
    return action;
}

export function setLists(lists) {
    const action = {
        type: SET_LISTS,
        lists
    };
    return action;
}
