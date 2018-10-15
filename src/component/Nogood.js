import React,{Component} from 'react';

class Nogood extends Component{
	constructor(){
		super()
	}
	componentWillMount(){
		console.log(this.props)
	}
	render(){
		return <div className="noProduct">
			<img src="//img07.yiguoimg.com/d/web/180315/013111/212501/noting@3x.png" alt=""/>
            <p className="hint">抱歉，没有找到你要的商品</p>
		</div>
	}
}

export default Nogood;