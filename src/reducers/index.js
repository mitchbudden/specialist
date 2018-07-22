import { combineReducers } from 'redux';
import user from './ReducerUser';
import goals from './ReducerGoals';
import completeGoals from './CompleteGoalsReducer';

export default combineReducers({
    user,
    goals,
    completeGoals
})