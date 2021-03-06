let list = {
	data:[]
}

// 指定state修改逻辑
// 根据不同的action操作旧的state
const reducer = function(state=list,action){
	switch(action.type){
		//添加
		case 'GET_LIST':
			return {
				...state,
				data:[...state.data,action.payload]
			}

		default:
			return state;
	}
}


export default reducer;