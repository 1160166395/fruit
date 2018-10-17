import React,{Component} from 'react';
import { ActivityIndicator,PullToRefresh } from 'antd-mobile';

import http from '../server';

import SearchItem from './searchItem';
import Nogood from './Nogood';

class SearchBy extends Component{
	constructor(){
		super()
		this.state={
			data:'',
			animating:true,
		}
	}
	componentWillMount(){
		http.post('/commodityapi/Commodity/GetSearchList',{
			body: {
				"CategoryCode": "",
				"CategoryId": this.props.location.search.slice(1),
				"Keyword": "",
				"PageIndex": 1,
				"Sort": this.props.history.location.sort
			},
			head: {"version": "h5", "cityCode": "128", 
			"cityId": "361bc174-b1e5-4fb6-8f69-c391dcd92644",
			"districtId": "e1040987-0230-4acf-9d75-8802e64033c7",
			"loginToken": "",
			"token": "",
			"version": "h5"}
		}).then(res=>{
			this.setState({data:res.data});console.log(this.state,this.props);
			this.setState({ animating: !this.state.animating });
			this.setState({PageIndex:++res.data.Data.PageNo});
			this.setState({PageCount: res.data.Data.PageCount});
			if(this.state.data.Data.CommodityList != ''){
				this.setState({content:<SearchItem val={this.state.data}/>});
			}else{
				this.setState({content:<Nogood/>});
			}
		})
	}
	componentWillReceiveProps(props){console.log(343)
		this.setState({ animating: !this.state.animating });
		http.post('/commodityapi/Commodity/GetSearchList',{
			body: {
				"CategoryCode": "",
				"CategoryId": this.props.location.search.slice(1),
				"Keyword": "",
				"PageIndex": 1,
				"Sort": props.history.location.sort
			},
			head: {"version": "h5", "cityCode": "128", 
			"cityId": "361bc174-b1e5-4fb6-8f69-c391dcd92644",
			"districtId": "e1040987-0230-4acf-9d75-8802e64033c7",
			"loginToken": "",
			"token": "",
			"version": "h5"}
		}).then(res=>{
			this.setState({data:res.data});
			//更新向组件SearchItem的数据
			this.setState({content:<SearchItem val={this.state.data}/>});
			this.setState({ animating: !this.state.animating });
		})
	}
	render(){	
		return <div>
			<ActivityIndicator
			text="Loading..."
			animating={this.state.animating}
			toast
		/>
		{!this.state.animating?(
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
			if(this.state.PageIndex<=this.state.PageCount){
				http.post('/commodityapi/Commodity/GetSearchList',{
					body: {
						"CategoryCode": "",
						"CategoryId": this.props.location.search.slice(1),
						"Keyword": "",
						"PageIndex": this.state.PageIndex,
						"Sort": this.props.history.location.sort
					},
					head: {"version": "h5", "cityCode": "128", 
					"cityId": "361bc174-b1e5-4fb6-8f69-c391dcd92644",
					"districtId": "e1040987-0230-4acf-9d75-8802e64033c7",
					"loginToken": "",
					"token": "",
					"version": "h5"}
				}).then(res=>{
					this.state.data.Data.CommodityList.push(...res.data.Data.CommodityList);
					this.state.PageIndex = ++res.data.Data.PageNo;
					this.setState({content:<SearchItem val={this.state.data}/>});
					console.log(res.data)
					this.setState({ refreshing: false });
				})
			}else{
				this.setState({more:true})
				setTimeout(() => {
					this.setState({ refreshing: false });
				}, 1000);
			}
			}}
			>
			{this.state.content}
			{
				this.state.more?(
					<div className="noMore"><p>到底了</p></div>
				):''
			}
			</PullToRefresh>
		)
		:''}
		
		</div>
		
	}
}

export default SearchBy;