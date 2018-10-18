import React,{Component} from 'react';
import { TabBar } from 'antd-mobile';
import {Route,Switch,Redirect,NavLink} from 'react-router-dom';

import Homepage from './homepage';
import Category from './category';
import Cart from './cart';
import Mine from './mine';
import http from '../server';
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
			selectedTab:'homepage',
		}
	}
	render(){
		
		return <div className="Home" >
			<div className="homebottom">
				{
					this.state.tabs.map((item,idx)=>{
					  return <NavLink className="bottomitem" key={idx} to={this.props.match.path+item.path} activeClassName="active">
					  <i className={['icon',item.icon].join(' ')}></i>
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
export default Home;