import React,{Component} from 'react';
import {NavLink,Route} from 'react-router-dom';
import Home from './Home';
import Cart from './cart';
import { Carousel,ActivityIndicator,PullToRefresh } from 'antd-mobile';

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
            imgHeight:200
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
                        <span className="cut active"><i></i></span>
                        <span className="input">1</span>
                        <span className="add"><i></i></span>
                    </div>
                </div>
            </div>
            <div className="address clearfix"></div>
            {this.state.show?(<div className="details">
            <table className="list" border="0" cellSpacing="0" cellPadding="0">
            {
                this.state.html.CommodityAttributes.map(item=>{
                    return <tr>
                        <th>{item.AttributeName}</th>
                        <td>{item.AttributeValue}</td>
                    </tr>
                })
            }
            </table>
            <div className="imgShow" dangerouslySetInnerHTML={{__html: this.state.html.CommodityRemark}}></div>
            </div>):''}
            </PullToRefresh>
            <footer className="footer">
                <NavLink to="/homepage" className="btn1"><i className="home"></i>首页</NavLink>
                <NavLink to="/cart" className="btn1"><i className="cart"></i>购物车
                {this.state.badge?<i className="num">{this.state.num}</i>:''}</NavLink>
                <a className="btn2">加入购物车</a>
            </footer>
            <Route path="/homepage" component={Home}/>
            <Route path="/cart" component={Cart}/>
        
        </div>)
        :''}	
		</div>
	}
}

export default Deitails;