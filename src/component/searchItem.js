import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';

class SearchItem extends Component{
	constructor(){
		super()
	}
	componentWillMount(){
		console.log(this.props)
	}
	//点击跳转到对应detail页
	goDetail(item){
		let {history} = this.props;
		history.push({
			pathname:"/deitails",
			search:item.CommodityCode
		})
	}
	render(){
		return <div>
			{
				this.props.val.Data.CommodityList.map(item=>{
					return <div className="productContent" key={item.CommodityCode} 
					onClick={this.goDetail.bind(this,item)}>
						<div className="img">
							<img src={item.SmallPic}/>
						</div>
						<div className="inforPro">
							<p className="tittle">{item.CommodityName}</p>
							<p className="txt">{item.SubTitle}</p>
							{item.PromotionTag?<i className="label">{item.PromotionTag}</i>:''}
							<p className="price">
								<span className="priceRed">{item.OriginalPrice}</span>
								<span className="standard">{item.Spec}</span>
								<span className="addCart"></span>
							</p>
						</div>
					</div>
				})
			}	
		</div>
	}
}

SearchItem = withRouter(SearchItem);
export default SearchItem;