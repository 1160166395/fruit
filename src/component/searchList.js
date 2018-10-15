import React,{Component} from 'react';
import {Route,Switch,NavLink,Redirect} from 'react-router-dom';

import SearchBy from './searchBy';

import '../css/searchList.css';


class searchList extends Component{
    constructor(){
        super();
        this.state={
        }
    }
//    componentWillMount(){
//        this.state.CategoryId=this.props.location.search.slice(1);
//    }
	render(){
		return <div className="searchList">
            <div className="navlist">
                <NavLink to={{pathname:this.props.match.path + "/searchBynum",sort:4,search:this.props.location.search}}
                    className="list"
                    activeClassName="active">销量</NavLink>
                <NavLink to={{pathname:this.props.match.path + "/searchBytime",sort:5,search:this.props.location.search}}
                    className="list"
                    activeClassName="active">新品</NavLink>
                <NavLink to={{pathname:this.props.match.path + "/searchByprice",sort:1,search:this.props.location.search}}
                    className="list"
                    activeClassName="active">价格<i className="priceIcon"></i></NavLink>
            </div>
            <div className="productshow">
                <Switch>
                <Route path={this.props.match.path + "/SearchBynum"} component={SearchBy}></Route>
                <Route path={this.props.match.path + "/SearchBytime"} component={SearchBy}></Route>
                <Route path={this.props.match.path + "/SearchByprice"} component={SearchBy}></Route>
                <Redirect  to={this.props.match.path+"/SearchBynum"+this.props.location.search} />
                </Switch>
            </div>
            <div className="option"></div>
        </div>
	}
}

export default searchList;