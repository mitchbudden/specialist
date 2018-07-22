import { combineReducers } from 'redux';
import user from './ReducerUser';
import goals from './ReducerGoals';

export default combineReducers({
    user,
    goals
})