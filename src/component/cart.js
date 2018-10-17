import React,{Component} from 'react';
import http from '../server';
import '../css/cart.css'


class Cart extends Component{
	constructor(){
		super();
		this.state={
			data:'',
			animating:true
		}
	}
	componentDidMount(){
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
	render(){
		return <div className="cart-wrap">
			<div className="nogoods">
				<div class="icon"></div>
				<p>购物车空空的，快去逛逛吧！</p>
				<div class="btn"><a>去逛逛</a></div>
			</div>
			<div className="guess">
				<div class="title"><h2>猜你喜欢</h2></div>
				<div className="list clearfix">
				{
					!this.state.animating?(
						this.state.data.CommodityList.map((item,idx)=>{
							return <div class="one" key={idx}>
							<div class="img">
								<img src={item.SmallPic}/>
							</div> 
							<div class="text">
								<h2 class="elli2">{item.CommodityName}</h2> 
								<p><strong class="red">￥<b>{item.SellPrice}</b></strong></p>
							</div>
							<div class="btn"><a></a></div>
						</div>
						})
					):''
				}	
				</div>
			</div>
			<div class="cart-total">
				<div class="check"><i class="no"></i>全选</div> 
				<div class="text">
					<p>合计(不含运费)：<b class="red">￥0.00</b></p> 
					<span>已优惠: ￥0.00</span>
				</div> 
				<div class="btn"><a class="no">去结算(0)</a></div>
			</div>
		</div>
	}
}

export default Cart;