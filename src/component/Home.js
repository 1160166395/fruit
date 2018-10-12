import React,{Component} from 'react';
import { TabBar } from 'antd-mobile';
import {Route,Switch} from 'react-router-dom';

import Homepage from './homepage';
import Category from './category';
import Cart from './cart';
import Mine from './mine';
import http from '../server';
import axios from 'axios';
import octicons from 'octicons';
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
					icon:'home',
					path:'\/'
				},
				{
					id:2,
					text:'品类',
					name:'category',
					icon:'tasklist',
					path:'/category'
				},
				{
					id:3,
					text:'购物车',
					name:'cart',
					icon:'plus',
					path:'/cart'
				},
				{
					id:4,
					text:'我的',
					name:'mine',
					icon:'person',
					path:'/mine'
				}
			],
			selectedTab:'homepage',
		}
	}
	render(){
		
		return <div className="Home" >
			<TabBar>
				{
					this.state.tabs.map((item)=>{
						return <TabBar.Item
						title={item.text}
						key={item.id}
						icon={
							<div dangerouslySetInnerHTML={{__html:octicons[item.icon].toSVG()}}/>
						}
						selectedIcon={
							<div className="selected" dangerouslySetInnerHTML={{__html:octicons[item.icon].toSVG()}}/>
						}
						selected={this.state.selectedTab == item.name}
						onPress={() => {
						  this.setState({
							selectedTab: item.name,
						  });
						  let {history} = this.props;
						  history.push(item.path)
						}}
					  >
					  <Switch>
						  <Route path='/category' component={Category}/>
						  <Route path='/cart' component={Cart}/>
						  <Route path='/mine' component={Mine}/>
						  <Route path='\/' component={Homepage}/>
					  </Switch>
					  </TabBar.Item>
					})
				}
			</TabBar>
			
		</div>	
	}
}
export default Home;