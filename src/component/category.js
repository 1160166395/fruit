import React,{Component} from 'react';
import {NavLink,Route,Redirect} from 'react-router-dom';
import http from '../server';
import axios from 'axios';
import {connect} from 'react-redux';
import { ActivityIndicator } from 'antd-mobile';

import ListItem from './listitem';
import {getList} from '../actions'

import '../css/category.css';
axios.defaults.headers.common['appName'] = 3000025;
class Category extends Component{
	constructor(){
		super()
		this.state = {
			data :'',
			animating:true,
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
			this.props.getList(res.data);
			this.setState({ animating: !this.state.animating });
		})
	}
	render(){
		return <div>
		<ActivityIndicator
		text="Loading..."
		animating={this.state.animating}
		toast
		/>{
		!this.state.animating
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
							this.state.data.Data.CategoryList.map((item,idx)=>{
								return <NavLink to={this.props.match.url+"/"+idx} 
									key={item.CategoryId} 
									activeClassName="active"
									// className={['navItem', idx == 0 && 'active'].join(' ')}
									className="navItem"
									>{item.CategoryName}</NavLink>
							})
						}
					</div>
				</nav>
				<div className="listContent">
					 <Route path={this.props.match.path+"/:id"}
					  component={ListItem}/>		
					  <Redirect  to={this.props.match.path+"/0"} />			
				</div>
			</div>
		</div>)
		:''}
		</div>
	}
}

let mapStateToProps = function(state){
	console.log(state,2,this.state)
	// state为保存在store中的数据
	return {
		list:state.listReducer.data
	}
}
let mapDispatchToProps = dispatch=>{
	return {
		getList(data){console.log(66,data)
			dispatch(getList(data))
		}
	}
}
Category = connect(mapStateToProps,mapDispatchToProps)(Category);

export default Category;