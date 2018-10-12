import React,{Component} from 'react';
import {NavLink,Route} from 'react-router-dom';
import http from '../server';
import axios from 'axios';

import ListItem from './listitem';

import '../css/category.css';
// import ListItem from 'antd-mobile/lib/list/ListItem';
axios.defaults.headers.common['appName'] = 3000025;
class Catrgory extends Component{
	constructor(){
		super()
		this.state = {
			data :'',
			animating:false
		}
	}
	componentWillMount(){
		http.post('/commodityapi/Commodity/GetAllCategory',{
			body: {"previewTime": "", "operationType": 0},
			head: {"version": "h5", "cityCode": "128", 
			"cityId": "361bc174-b1e5-4fb6-8f69-c391dcd92644",
			"districtId": "e1040987-0230-4acf-9d75-8802e64033c7",
			"loginToken": "",
			"token": "",
			"version": "h5"}
		}).then(res=>{
			this.state.data = res.data;console.log(this.state.data.Data,this.props);
			this.setState({ animating: !this.state.animating });
		})
	}
	render(){
		return this.state.animating
			?(<div className="category">
			<div className="search-top">
				<div className="search-inp">
					<i className="icon"></i>
					<input name="search" id="search" placeholder="请输入商品名称" />
					<i className="close"></i>
				</div>
				<span className="txt">搜索</span>
			</div>
			<div className="searchContent clearfix">
				<nav className="nav">
					<div className="navlist">
						{
							this.state.data.Data.CategoryList.map(item=>{
								return <NavLink to={this.props.match.url+"/"+item.CategoryCode} 
									key={item.CategoryId} 
									activeClassName="active"
									className="navItem">{item.CategoryName}</NavLink>
							})
						}
					</div>
				</nav>
				<div className="listContent">
					 <Route path={this.props.match.path+"/:id"}
					  data={this.state.data.Data.CategoryList} 
					  component={ListItem}/>					
				</div>
			</div>
		</div>)
		:'';
	}
}

export default Catrgory;