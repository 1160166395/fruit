import { combineReducers } from 'redux';

import listReducer from './listReducer';
import goodsReducer from './goodsReducer';
import cartReducer from './cartReducer';

// 合并成一个Reducer

const rootReducer = combineReducers({
	listReducer,
	goodsReducer,
	cartReducer
});

export default rootReducer;