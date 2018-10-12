import React,{Component} from 'react';
class Product extends Component{
    constructor(props){
        super();
        this.data = props.val;
    }
    render(){
        return <div className="product">
            {this.data.commoditysComponentList.map(item=>{
                return <div className="proitem" key={item.commodityComponentId}>
                    <img src={item.pictureUrl}/>
                    <div className="info">
                        <p className="name">{item.commodityName}</p>
                        <div className="saletip"><span>{item.saleSlogan}</span></div>
                        <div className="price"><strong>{item.commodityPrice}</strong>{item.commoditySpec}</div>
                    </div>
                </div>
            })}
        </div>
    }
}
export default Product;