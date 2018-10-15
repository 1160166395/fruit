import React,{Component} from 'react';
import { ActivityIndicator } from 'antd-mobile';

import http from '../server';

import SearchItem from './searchItem';
import Nogood from './Nogood';

class SearchBy extends Component{
	constructor(){
		super()
		this.state={
			data:'',
			animating:true
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
			if(this.state.data.Data.CommodityList != ''){
				this.setState({content:<SearchItem val={this.state.data}/>});
			}else{
				this.setState({content:<Nogood/>});
			}
		})
	}
	componentWillReceiveProps(props){
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
		{!this.state.animating?this.state.content:''}
		
		</div>
		
	}
}

export default SearchBy;