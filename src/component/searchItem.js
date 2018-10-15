import React,{Component} from 'react';

class SearchItem extends Component{
	constructor(){
		super()
	}
	componentWillMount(){
		console.log(this.props)
	}
	render(){
		return <div>
			{
				this.props.val.Data.CommodityList.map(item=>{
					return <div className="productContent" key={item.CommodityCode}>
						<div className="img">
							<img src={item.SmallPic}/>
						</div>
						<div className="inforPro">
							<p className="tittle">{item.CommodityName}</p>
							<p className="txt">{item.SubTitle}</p>
							<i className="label">{item.PromotionTag}</i>
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

export default SearchItem;