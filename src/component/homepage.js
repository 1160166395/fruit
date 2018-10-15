import React,{Component} from 'react';
import http from '../server';
import axios from 'axios';
import { Carousel,ActivityIndicator } from 'antd-mobile';
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
	render(){
		return <div>
		<ActivityIndicator
		text="Loading..."
		animating={this.state.animating}
		toast
		/>
		{!this.state.animating
		?(<div className="homepage">
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
		</div>)	
	:''}
	</div>
		
	}
}

export default Homepage;