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
			show:false,
			update:true,
			selectAll:false
		
		}
	}
	componentDidMount(){console.log(this.props.carlist)
		if(this.props.carlist != ''){
			this.setState({show:true,selectAll:true});
			this.allprice();
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
	//计算价格
	allprice(){
		let num = 0;
		this.props.carlist.forEach(item => {
			if(item.checked){
				num++;
			}
		});
		let sum = 0;
		this.props.carlist.forEach(item => {
			if(item.checked){
				sum += item.qty*item.SellPrice;
			}
		});
		this.setState({sum:sum,num:num});console.log(2,this.props.carlist)
	}
	//判断全选反选
	selected(){
		let res = this.props.carlist.every(item=>{
			return item.checked === true;
		})
		if(res){
			this.state.selectAll = true;
		}else{
			this.state.selectAll = false;
		}
	}
	//全选反选
	selectAlls(){
		if(!this.state.selectAll){
			this.props.carlist.forEach(item=>{
				item.checked = true;
			});
		}else{
			this.props.carlist.forEach(item=>{
				item.checked = false;
			});
		}
		this.setState({selectAll:!this.state.selectAll});
		this.allprice();
	}
	//选中
	selectgood(item){
		item.checked = !item.checked;
		this.selected.bind(this)();
		this.allprice();
		this.setState({update:!this.state.update})
	}
	//加数量
	handlerAddToCart(goods){

		let qty = goods.qty+1;
		this.props.changeQty(goods.CommodityCode,qty);
		this.allprice();
    	
	}
	//减数量
	handlerCutToCart(goods){
		if(goods.qty>1){
			let qty = goods.qty-1;
			this.props.changeQty(goods.CommodityCode,qty);
			this.allprice();
		}
    	
	}
	//删除商品
	handlerDelToCart(goods){
		if(this.props.carlist.length == 1){
			this.setState({show:false})
		}
		this.props.removeGoods(goods.CommodityCode);
		this.allprice();
	}
	//点击跳转到对应detail页
	goDetail(item){
		let {history} = this.props;
		// history.push({
		// 	pathname:"/deitails",
		// 	search:item.CommodityCode
		// })
	}
	//点击跳转到对应home页
	goHome(item){
		let {history} = this.props;
		history.push({
			pathname:"/home/homepage"
		})
	}
	handlerAddToCarts(goods,event){
		if (event.cancelable) {
			// 判断默认行为是否已经被禁用
			if (!event.defaultPrevented) {
				event.preventDefault();
			}
		}
		// e.preventDefault();
    	// 获取购物车中的数据
    	let {carlist} = this.props;       
    	// 判断点击的当前商品是否存在购物车中
    	let res = carlist.filter(item=>item.CommodityCode === goods.CommodityCode)[0];
    	if(res){
    		// 存在，则修改数量
			let qty = res.qty+1;
            this.props.changeQty(goods.CommodityCode,qty);this.allprice();
            // this.setState({update:!this.state.update})
    	}else{
    		// 不存在，则添加商品
			goods.qty = 1;
			goods.checked = true;
			this.props.addToCar(goods);

		}
		this.selected();
		this.setState({show:true});
		this.allprice();
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
								<div className="check"><i className={item.checked?"active":''}
								onTouchStart={this.selectgood.bind(this,item)}></i></div> 
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
				<p >购物车空空的，快去逛逛吧！</p>
				<div className="btn"><a onTouchStart={this.goHome.bind(this)}>去逛逛</a></div>
			</div>
		}
			
			<div className="guess">
				<div className="title"><h2>猜你喜欢</h2></div>
				<div className="list clearfix">
				{
					!this.state.animating?(
						this.state.data.CommodityList.map((item,idx)=>{
							return <div className="one" key={idx}  onTouchStart={this.goDetail.bind(this,item)}>
							<div className="img">
								<img src={item.SmallPic}/>
							</div> 
							<div className="text">
								<h2 className="elli2">{item.CommodityName}</h2> 
								<p><strong className="red">￥<b>{item.SellPrice}</b></strong></p>
							</div>
							<div className="btn" onTouchStart={this.handlerAddToCarts.bind(this,item)}><a></a></div>
						</div>
						})
					):''
				}	
				</div>
			</div>
			<div className="cart-total">
				<div className="check"><i className={this.state.selectAll?'active':''}
				onTouchStart={this.selectAlls.bind(this)}></i>全选</div> 
				<div className="text">
					<p>合计(不含运费)：<b className="red">￥{this.state.sum?this.state.sum:'0.00'}</b></p> 
					<span>已优惠: ￥0.00</span>
				</div> 
				<div className="btn"><a className={this.state.num?'':'no'}>去结算({this.state.num?this.state.num:0})</a></div>
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
		},
		addToCar:(goods)=>{
			dispatch({
				type:'CART_ADD',
				payload:goods
			})
		}
	}
}

Cart = connect(mapStateToProps,mapDispatchToProps)(Cart);

export default Cart;