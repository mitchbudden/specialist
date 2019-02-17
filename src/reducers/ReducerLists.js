import { SET_LISTS } from "../constants/listCategoryIcons";

export default (state = [], action) => {
    switch (action.type) {
        case SET_LISTS:
            const { lists } = action;
            return lists;
        default:
            return state;
    }
};
