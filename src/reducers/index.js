import { combineReducers } from 'redux';
import user from './ReducerUser';
import lists from './ReducerGoals';

export default combineReducers({
    user,
    lists
})