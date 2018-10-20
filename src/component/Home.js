import React,{Component} from 'react';
import {Route,Switch,Redirect,NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

import Homepage from './homepage';
import Category from './category';
import Cart from './cart';
import Mine from './mine';
import axios from 'axios';
import octicons from 'octicons';
import '../css/home.css'
axios.defaults.headers.common['appName'] = 3000025;

class Home extends Component{
	constructor(){
		super()
		this.state={
			tabs:[
				{
					id:1,
					text:'首页',
					name:'homepage',
					icon:'icon1',
					path:'/homepage'
				},
				{
					id:2,
					text:'分类',
					name:'category',
					icon:'icon2',
					path:'/category'
				},
				{
					id:3,
					text:'购物车',
					name:'cart',
					icon:'icon3',
					path:'/cart'
				},
				{
					id:4,
					text:'我的',
					name:'mine',
					icon:'icon4',
					path:'/mine'
				}
			],
			num:''
		}
	}
	render(){
		
		return <div className="Home" >
			<div className="homebottom">
				{
					this.state.tabs.map((item,idx)=>{
					  return <NavLink className="bottomitem" key={idx} to={this.props.match.path+item.path} activeClassName="active">
					  <i className={['icon',item.icon].join(' ')}>
					  {(idx===2&&this.props.carlist.length!=0)?<b>{this.props.carlist.length}</b>:''}</i>
					  {item.text}</NavLink>
					})
				}
			</div>
			<Switch>
			   	  <Route path={this.props.match.path+'/homepage'} component={Homepage}/>
			 	  <Route path={this.props.match.path+'/category'} component={Category}/>
			 	  <Route path={this.props.match.path+'/cart'} component={Cart}/>
			 	  <Route path={this.props.match.path+'/mine'} component={Mine}/>
			 	  <Redirect  to={this.props.match.path+'/homepage'} />	
			   </Switch>
		</div>	
	}
}

let mapStateToProps = function(state){
	// state为保存在store中的数据
	return {
		carlist:state.cartReducer.data
	}
}
// 连接组件并指定暴露的数据
Home = connect(mapStateToProps)(Home);
export default Home;