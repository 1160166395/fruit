import React,{Component} from 'react';

class ListItem extends Component{
	constructor(){
		super();
		// this.data = this.props.data;
		this.state = {
			category:'',
			
		}
	}
	componentWillMount(){
		console.log(this.props)
	}
	render(){
		return <div>
			
			ListItem
		</div>
	}
}

export default ListItem;