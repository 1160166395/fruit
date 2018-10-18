let cartPage = {
	goods:{
			
		}
}

// 指定state修改逻辑
// 根据不同的action操作旧的state
const reducer = function(state=cartPage,action){
	switch(action.type){
		//添加
		case 'GOODS_CHANGE':
			return {
				...state,
				data:[...state.data,action.payload]
			}

		default:
			return state;
	}
}


export default reducer;