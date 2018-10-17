import React,{Component} from 'react';
import http from '../server';
import axios from 'axios';
import { Carousel,ActivityIndicator,PullToRefresh } from 'antd-mobile';
import Product from './product';
import '../css/homepage.css'
axios.defaults.headers.common['appName'] = 3000025;


class Homepage extends Component{
	constructor(){
		super();
		this.state = {
			data:'',
			animating: true,
			imgHeight:200
		}
	}
	//挂载前拿数据
	componentWillMount(){
		http.post('/home/TemplateComponent/GetTemplateComponentInfo',{
			body: {"previewTime": "", "operationType": 0},
			head: {"version": "h5", "cityCode": "128", 
			"cityId": "361bc174-b1e5-4fb6-8f69-c391dcd92644",
			"districtId": "e1040987-0230-4acf-9d75-8802e64033c7",
			"loginToken": "",
			"token": "",
			"version": "h5"}
		}).then(res=>{
			this.state.data = res.data;console.log(this.state.data.Data);
			this.setState({ animating: !this.state.animating });
		})
	}
	//点击跳转到对应search页
	goSearch(item){
		let {history} = this.props;
		history.push({
			pathname:"/searchlist",
			search:item.hrefValue
		})
	}
	//数据加载之前loading组件，并通过animating的值判断数据是否拿到，防止异步
	render(){
		return <div>
		<ActivityIndicator
		text="Loading..."
		animating={this.state.animating}
		toast
		/>
		{!this.state.animating
		?(<PullToRefresh
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
			http.post('/home/TemplateComponent/GetTemplateComponentInfo',{
				body: {"previewTime": "",
				"homePageId": "4d2a61b6-682e-4bd2-9c26-ae5ef71982a3",
				"operationType": 1,
				"pageIndex": 1,
				"publishTime": "2018/10/17 11:48:43",
				},
				head: {"version": "h5", "cityCode": "128", 
				"cityId": "361bc174-b1e5-4fb6-8f69-c391dcd92644",
				"districtId": "e1040987-0230-4acf-9d75-8802e64033c7",
				"loginToken": "",
				"token": "",
				"version": "h5"}
			}).then(res=>{
				console.log(res.data)
			})
			// setTimeout(() => {
			// 	this.setState({ refreshing: false });
			// }, 1000);
			}}
			>
			<div className="homepage">
	  		<div className="first-page">
				<div className="top">
					<div className='search'>
					<a className='btn'></a>
					</div>
				</div>
				<Carousel
					autoplay={true}
					infinite
					>
					{this.state.data.Data.templateComponentList[0].carouselPictures.map(val => (
						<a 
						key={val.framesIndex}
						style={{ display: 'inline-block', width: '100%',height: this.state.imgHeight }}
						href="#">
							<img
								src={val.pictureUrl}
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
				<div className='first-screen'>
					<img src={this.state.data.Data.templateComponentList[0].adPictures[0].pictureUrl} />
				</div>
				<div className="first-menu">
					{this.state.data.Data.templateComponentList[0].navComponentList.map(item=>{
						return <a className="one" key={item.navIndex} onClick={this.goSearch.bind(this,item)}>
							<img src={item.pictureUrl} />
							<p>{item.navName}</p>
						</a>
					})}
				</div>
				<div className="first-news">
					<i></i>
					<div className="news-container">
						<div className="swiper-container">
						{this.state.data.Data.templateComponentList[0].fastReportsList.map(item=>{
							return <p key={item.fastReportId}>{item.fastReportTitle}</p>
						})}
						{this.state.data.Data.templateComponentList[0].fastReportsList.map(item=>{
							return <p key={item.fastReportId}>{item.fastReportTitle}</p>
						})}
						</div>
					</div>
				</div>
			</div>
			{
			this.state.data.Data.templateComponentList.slice(1).map((item,idx)=>{
				return <div className="floor" key={idx}>
					<a href="#" className="floor-img">
						<img src={item.adPictures[0].pictureUrl}/>
					</a>
					<div className="products clearfix">
						<Product val={item}/>
					</div>
				</div>
			})}
		</div></PullToRefresh>)	
	:''}
	</div>
		
	}
}

export default Homepage;