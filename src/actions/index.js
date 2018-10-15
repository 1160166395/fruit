// 添加商品
function addToCart(goods){
	return {
		type:'CART_ADD',
		payload:goods
	}
}

// 删除商品
function removeGoods(proId){
	return {
		type:'CART_REMOVE',
		payload:{proId}
	}
}

// 修改商品数量
function changeQty(proId,qty){
	return {
		type:'CART_CHANGE_QTY',
		payload:{proId,qty}
	}
}
//获取列表信息
function getList(data){
	return{
		type:'GET_LIST',
		payload:{data}
	}
}
export {
	addToCart,
	removeGoods,
	changeQty,
	getList
}