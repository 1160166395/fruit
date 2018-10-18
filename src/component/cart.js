import React,{Component} from 'react';
import http from '../server';
import {connect} from 'react-redux';
import '../css/cart.css';


class Cart extends Component{
	constructor(){
		super();
		this.state={
			data:'',
			animating:true,
			show:false
		
		}
	}
	componentDidMount(){console.log(this.props.carlist)
		if(this.props.carlist != ''){
			this.setState({show:true})
		}
		http.post('/commodityapi/Commodity/GetGuessRecommentCommodity',{
			body: {GuessRecommendType: 1},
			head: {"version": "h5", "cityCode": "128", 
			"cityId": "361bc174-b1e5-4fb6-8f69-c391dcd92644",
			"districtId": "e1040987-0230-4acf-9d75-8802e64033c7",
			"loginToken": "",
			"token": "",
			DeviceId: "1f7210c3d06040f08b1613aa12197856"}
        }).then(res=>{
			this.state.data = res.data.Data;
			this.setState({ animating: !this.state.animating });
		})
	}
	//加数量
	handlerAddToCart(goods){

		let qty = goods.qty+1;
		this.props.changeQty(goods.CommodityCode,qty);
    	
	}
	//减数量
	handlerCutToCart(goods){
		if(goods.qty>1){
			let qty = goods.qty-1;
			this.props.changeQty(goods.CommodityCode,qty);
		}
    	
	}
	//删除商品
	handlerDelToCart(goods){
		if(this.props.carlist.length == 1){
			this.setState({show:false})
		}
		this.props.removeGoods(goods.CommodityCode);
	}
	//点击跳转到对应detail页
	goDetail(item){
		let {history} = this.props;
		history.push({
			pathname:"/deitails",
			search:item.CommodityCode
		})
	}
	render(){
		return <div className="cart-wrap">
		{
			this.state.show
			?this.props.carlist.map(item=>{
				return <div className="goods" key={item.CommodityCode}>
					<div className="group ">
						<div className="saleGroup">
							<div className="one ">
								<div className="check"><i className="active"></i></div> 
								<div className="img"><img src={item.SmallPic}/></div> 
								<div className="text">
								<h2 className="elli2">{item.CommodityName}</h2> 
								<div className="tag">
								</div> 
								<p><strong className="red">￥<b>{item.SellPrice.toFixed(2)}</b></strong> </p>
								</div> <div className="del" onClick={this.handlerDelToCart.bind(this,item)}><i></i></div>
								<div className="num">
								<span className="cut" onClick={this.handlerCutToCart.bind(this,item)}><i></i></span> 
								<span className="input ">{item.qty}</span> 
								<span className="add" onClick={this.handlerAddToCart.bind(this,item)}><i></i></span>
								</div>
							</div> 
						</div>
					</div>
				</div>
			})
			:<div className="nogoods">
				<div className="icon"></div>
				<p>购物车空空的，快去逛逛吧！</p>
				<div className="btn"><a>去逛逛</a></div>
			</div>
		}
			
			<div className="guess">
				<div className="title"><h2>猜你喜欢</h2></div>
				<div className="list clearfix">
				{
					!this.state.animating?(
						this.state.data.CommodityList.map((item,idx)=>{
							return <div className="one" key={idx}  onClick={this.goDetail.bind(this,item)}>
							<div className="img">
								<img src={item.SmallPic}/>
							</div> 
							<div className="text">
								<h2 className="elli2">{item.CommodityName}</h2> 
								<p><strong className="red">￥<b>{item.SellPrice}</b></strong></p>
							</div>
							<div className="btn"><a></a></div>
						</div>
						})
					):''
				}	
				</div>
			</div>
			<div className="cart-total">
				<div className="check"><i className="no"></i>全选</div> 
				<div className="text">
					<p>合计(不含运费)：<b className="red">￥0.00</b></p> 
					<span>已优惠: ￥0.00</span>
				</div> 
				<div className="btn"><a className="no">去结算(0)</a></div>
			</div>
		</div>
	}
}

let mapStateToProps = state=>{
	return {
		carlist:state.cartReducer.data
	}
}

let mapDispatchToProps = dispatch=>{
	return {
		removeGoods:(CommodityCode)=>{
			dispatch({
				type:'CART_REMOVE',
				payload:{CommodityCode}
			})
		},
		changeQty:(CommodityCode,qty)=>{
			dispatch({
				type:'CART_CHANGE_QTY',
				payload:{CommodityCode,qty}
			})
		}
	}
}

Cart = connect(mapStateToProps,mapDispatchToProps)(Cart);

export default Cart;