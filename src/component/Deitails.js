import React,{Component} from 'react';
import {NavLink,Route} from 'react-router-dom';
import Home from './Home';
import Cart from './cart';
import { Carousel,ActivityIndicator,PullToRefresh } from 'antd-mobile';
import {connect} from 'react-redux';

import http from '../server';
import '../css/details.css';

class Deitails extends Component{
	constructor(){
        super()
        this.state = {
			data :'',
            animating:true,
            badge:false,
            num:1,
            imgHeight:200,
            total:1,
            delactive:true,
            update:true
        }
    }
    //添加数量
    add(){
        if(this.state.total==1){
            this.state.delactive=!this.state.delactive
        }
        this.setState({total:++this.state.total})
    }
    del(){
        if(this.state.total==2){
            this.state.delactive=!this.state.delactive
        }
        if(this.total>1){
            this.setState({total:--this.state.total})
        }
    }
	componentWillMount(){
		http.post('/commodityapi/Commodity/GetCommodityInfo',{
			body: {"CommodityCode": this.props.location.search.slice(1), "CommodityId": ""},
			head: {"version": "h5", "cityCode": "128", 
			"cityId": "361bc174-b1e5-4fb6-8f69-c391dcd92644",
			"districtId": "e1040987-0230-4acf-9d75-8802e64033c7",
			"loginToken": "",
			"token": "",
            "version": "h5"}
        }).then(res=>{
			this.state.data = res.data.Data.CommodityInfo;
			this.setState({ animating: !this.state.animating });
		})
    }
    handlerAddToCart(goods){
    	// 获取购物车中的数据
    	let {carlist} = this.props;
    	
    	goods.qty = this.state.total;
        
    	// 判断点击的当前商品是否存在购物车中
    	let res = carlist.filter(item=>item.CommodityCode === goods.CommodityCode)[0];console.log(res,carlist)
    	if(res){
    		// 存在，则修改数量
			let qty = res.qty+this.state.total;console.log(qty)
            this.props.changeQty(goods.CommodityCode,qty);
            this.setState({update:!this.state.update})
    	}else{
    		// 不存在，则添加商品
            goods.checked = true;
			// goods.checkedbox = true;
    		this.props.addToCar(goods);
    	}
    	
    }
	render(){
		return <div className="product">
        <ActivityIndicator
		text="Loading..."
		animating={this.state.animating}
		toast
		/>{
        !this.state.animating?
        (<div>
        <PullToRefresh
			damping={60}
			ref={el => this.ptr = el}
			style={{
			height: this.state.height,
			overflow: 'auto',
			}}
			indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
			direction={this.state.down ? 'down' : 'up'}
			refreshing={this.state.refreshing}
			onRefresh={() => {
			this.setState({ refreshing: true });
				http.post('commodityapi/Commodity/GetCommodityDetail',{
					body: {
                        CommodityId:this.state.data.CommodityId
					},
					head: {
                        DeviceId: "1f7210c3d06040f08b1613aa12197856",
					    "loginToken": "",
                        "token": "",
                    }
				}).then(res=>{
                    this.setState({ html: res.data.Data });
                    this.setState({ refreshing: false });
                    this.setState({ show: true });
				})
			}}
			>
            <Carousel
                autoplay={true}
                infinite
                >
                {this.state.data.Pictures.map((val,idx) => (
                    <a 
                    key={idx}
                    style={{ display: 'inline-block', width: '100%',height: this.state.imgHeight }}
                    href="#">
                        <img
                            src={val}
                            style={{ width: '100%', verticalAlign: 'top' }}
                            onLoad={() => {
                                // fire window resize event to change height
                                window.dispatchEvent(new Event('resize'));
                                this.setState({ imgHeight: 'auto' });
                            }}
                        />
                    </a>
                ))}
            </Carousel>
            <div className="productInfor">
                <p className="title">{this.state.data.CommodityName}</p>
                <p className="subhead">
                    <i className="label">{this.state.data.PromotionTag}</i>
                    <span>{this.state.data.SubTitle}</span>
                </p>
                <div className="price">
                    <p className="priceIn">
                        <span className="priceRed"><i>¥</i>{this.state.data.SellPrice}</span>
                    </p>
                    <p className="area">产地：<span className="name">{this.state.data.PlaceOfOrigin}</span></p>
                </div>
                <div className="sevenDay">
                    <i className="dian"></i>
                    {this.state.data.CanNoReasonToReturnText}
                </div>
            </div>
            {this.state.data.CommodityPromotions != ''
            ?(<div className="sale">
                <h3 className="line-bottom">促销</h3>
                <div className="saleIn">
                    <div className="saleList">
                        <i className="label">{this.state.data.CommodityPromotions[0].PromotionTypeText}</i>
                        <p className="title">{this.state.data.CommodityPromotions[0].PromotionTitle}</p>
                        <div className="list">
                        {
                            this.state.data.CommodityPromotions[0].PromotionLevels.map((item,idx)=>{
                                return <p key={idx} className="txt">{item.LevelTitle}</p>
                            })
                        }
                        </div>
                    </div>
                </div>
            </div>
            )
            :''}
            <div className="norms">
                <div className="title">
                    规格 
                    {this.state.data.Speces.map((item,idx)=>{
                        return <span className={['choose', item.Spec == this.state.data.Spec && 'active'].join(' ')}
                        key={idx}>{item.Spec}</span>
                    })}    
                </div>
                <div className="title">
                    数量
                    <div className="num">
                        <span className={['cut', this.state.delactive && 'active'].join(' ')}
                        onClick={this.del.bind(this)}><i></i></span>
                        <span className="input">{this.state.total}</span>
                        <span className="add" onClick={this.add.bind(this)}><i></i></span>
                    </div>
                </div>
            </div>
            <div className="address clearfix"></div>
            {this.state.show?(<div className="details">
            <table className="list" border="0" cellSpacing="0" cellPadding="0">
            <tbody>
            {
                this.state.html.CommodityAttributes.map((item,idx)=>{
                    return <tr key="idx">
                        <th>{item.AttributeName}</th>
                        <td>{item.AttributeValue}</td>
                    </tr>
                })
            }
            </tbody>
            </table>
            <div className="imgShow" dangerouslySetInnerHTML={{__html: this.state.html.CommodityRemark}}></div>
            </div>):''}
            </PullToRefresh>
            <footer className="footer">
                <NavLink to="/home/homepage" className="btn1"><i className="home"></i>首页</NavLink>
                <NavLink to="/home/cart" className="btn1"><i className="cart"></i>购物车
                {this.props.carlist.length!=0?<i className="num">{this.props.carlist.length}</i>:''}</NavLink>
                <a className="btn2" onClick={this.handlerAddToCart.bind(this,this.state.data)}>加入购物车</a>
            </footer>
            <Route path="/home/homepage" component={Home}/>
            <Route path="/home/cart" component={Cart}/>
        
        </div>)
        :''}	
		</div>
	}
}

let mapStateToProps = function(state){
	// state为保存在store中的数据
	return {
		carlist:state.cartReducer.data
	}
}

let mapDispatchToProps = function(dispatch){
	return {
		addToCar:(goods)=>{
			dispatch({
				type:'CART_ADD',
				payload:goods
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
// 连接组件并指定暴露的数据
Deitails = connect(mapStateToProps,mapDispatchToProps)(Deitails);
export default Deitails;