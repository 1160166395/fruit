import {createStore} from 'redux';

// import {composeWithDevTools} from 'redux-devtools-extension';
// 引入Reducer
import reducer from '../reducers';

const store = createStore(reducer/*,composeWithDevTools()*/);

export default store;