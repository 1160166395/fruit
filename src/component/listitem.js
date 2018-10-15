import React,{Component} from 'react';
import {connect} from 'react-redux';

class ListItem extends Component{
	constructor(props){
		super();
		this.state = {
			id:props.match.params.id,
			
		}
	}
	componentWillReceiveProps(props){
		let {id} = props.match.params;
		this.setState({
			id
		});

	}
	//点击跳转到对应search页
	goSearch(item){
		let {history} = this.props;
		history.push({
			pathname:"/searchlist",
			search:item.CategoryId
		})
	}
	render(){
		return <div className="commodityBox">{console.log(this.props,44)}
			{
				this.props.list.CategoryList[this.state.id].Childs.map(item=>{
					return <a key={item.CategoryId} className="commodityList"
					onClick={this.goSearch.bind(this,item)}>
						<img src={item.PictureUrl}/>
						{item.CategoryName}
					</a>
				})
			}
			
		</div>
	}
}
let mapStateToProps = function(state){
	// state为保存在store中的数据
	return {
		list:state.listReducer.data[0].data.Data
	}
}
ListItem = connect(mapStateToProps)(ListItem);

export default ListItem;