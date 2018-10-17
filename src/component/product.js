import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';

class Product extends Component{
    constructor(props){
        super();
        this.data = props.val;
    }
    //点击跳转到对应detail页
	goDetail(item){
		let {history} = this.props;
		history.push({
			pathname:"/deitails",
			search:item.commodityCode
		})
	}
    render(){
        return <div className="product">
            {this.data.commoditysComponentList.map(item=>{
                return <div className="proitem" key={item.commodityComponentId}
                    onClick={this.goDetail.bind(this,item)}>
                    <img src={item.pictureUrl}/>
                    <div className="info">
                        <p className="name">{item.commodityName}</p>
                        <div className="saletip">
                            {item.saleSlogan?<span>{item.saleSlogan}</span>:''}
                        </div>
                        <div className="price"><strong>{item.commodityPrice}</strong>{item.commoditySpec}</div>
                    </div>
                </div>
            })}
        </div>
    }
}
Product = withRouter(Product);
export default Product;