import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import "../css/mine.css";

class Mine extends Component{
	render(){
		return <div className="my">
			<header className="head clearfix">
				<div className="headimg">
					<span className="borderImg">
						<img alt=" 用户头像" src="//img02.yiguo.com/e/web/150703/00781/140145/no-pic.jpg"/>
					</span>
					<NavLink to="/login">
						<p className="name">登录/注册</p>
					</NavLink>
				</div>
				<i className="setting"></i>
				<div className="account">
					<p className="list">
						<span className="num">0</span>
						<span className="txt">账户余额</span>
					</p>
					<p className="list">
						<span className="num">0</span>
						<span className="txt">优惠券</span>
					</p>
					<p className="list">
						<span className="num">0</span>
						<span className="txt">悠币</span>
					</p>
				</div>
			</header>
			<div className="listTab">
				<ul className="line-bottom">
					<li className="fourLi">
						<a>
							<i className="icon">
							<img src="https://img07.yiguoimg.com/d/web/180608/01261/105825/unpaid.png" />
							</i>
							待支付
						</a>
					</li>
					<li className="fourLi">
						<a>
							<i className="icon">
							<img src="https://img07.yiguoimg.com/d/web/180608/01261/105825/take.png" alt=""/>
							</i>
							待收货
						</a>
					</li>
					<li className="fourLi">
						<a>
							<i className="icon">
							<img src="http://img05.yiguoimg.com/d/web/180608/01261/105825/evaluate.png" alt=""/>
							</i>
							评价送悠币
						</a>
					</li>
					<li className="fourLi">
						<a>
							<i className="icon">
							<img src="https://img06.yiguoimg.com/d/web/180608/01261/105825/changing.png" alt=""/>
							</i>
							在线退换货
						</a>
					</li>
					<li className="fourLi borderLeft">
						<span className="pointRight"></span>
						<a>
							<i className="icon"></i>
							全部订单
							<i className="goPage"></i>
						</a>
					</li>
				</ul>
			</div>
			<div className="testList clearfix">
				<div className="line">
					<a>
					<img src="https://img02.yiguo.com/e/web/130101/app/icon/usercenter/address@3x.png" alt="" className="icon"/>
					收货地址
					</a>
				</div>
				<div className="line">
					<a>
					<img src="https://img02.yiguo.com/e/web/130101/app/icon/usercenter/yellowcard@3x.png" alt="" className="icon"/>
					充值卡
					</a>
				</div>
				<div className="line">
					<a>
					<img src="https://img02.yiguo.com/e/web/130101/app/icon/usercenter/delivery@3x.png" alt="" className="icon"/>
					礼品兑换卷
					</a>
				</div>
				<div className="line">
					<a>
					<img src="https://img02.yiguo.com/e/web/130101/app/icon/usercenter/help@3x.png" alt="" className="icon"/>
					帮助中心
					</a>
				</div>
				<div className="line">
					<a>
					<img src="https://img02.yiguo.com/e/web/130101/app/icon/usercenter/service@3x.png" alt="" className="icon"/>
					在线客服
					</a>
				</div>
			</div>
			
			
		</div>
	}
}

export default Mine;