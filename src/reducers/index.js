import { combineReducers } from 'redux';

import listReducer from './listReducer';
import searchReducer from './searchReducer';

// 合并成一个Reducer

const rootReducer = combineReducers({
	listReducer,
	searchReducer
});

export default rootReducer;