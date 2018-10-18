let cartPage = {
	data:[
	]
	// total:100,
	// ...
}

// 指定state修改逻辑
// 根据不同的action操作旧的state
const reducer = function(state=cartPage,action){
	switch(action.type){
		//添加
		case 'CART_ADD':
			return {
				...state,
				data:[...state.data,action.payload]
			}
		//修改数量
		case 'CART_CHANGE_QTY':
			return {
				...state,
				data:state.data.map(item=>{
					// 找出对应商品，并修改数量
					if(item.CommodityCode == action.payload.CommodityCode){
						item.qty = action.payload.qty;
					}
					return item;
				})
			}
		//删除
		case 'CART_REMOVE':
			return {
				...state,
				data:state.data.filter(item=>item.CommodityCode!=action.payload.CommodityCode)
			}
		default:
			return state;
	}
}


export default reducer;