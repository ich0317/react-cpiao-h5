import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SvgIcon from "@/components/SvgIcon/index.js"
import "./my.scss"
import { getLoginInfo } from "@/api/api";

class My extends Component {
    constructor(props){
        super(props)
        this.state = {
            username:null
        }
    }

    componentDidMount(){
        getLoginInfo().then(res=>{
            let { code, data } = res;
            if (code === 0) {
                this.setState({
                    username:data.username
                })
            }
        })
    }

    toLogin = () =>{
        window.location.href="/login";
    }

    render(){
        
        return(
            <div className="my">
                <div className="my_bg">
                    <dl className="persional">
                        <dt><img src={require('@/assets/default-photo.png')} width="50" height="50" alt=""/></dt>
                        {
                            this.state.username ? <dd>{this.state.username}</dd> :
                            <dd onClick={this.toLogin}>点击登录</dd>
                        }
                    </dl>
                </div>
                <div className="cloumn">
                    <ul className="persional_item">
                        <li>
                            <Link to="/order-list">
                                <div className="item_title">
                                    <SvgIcon iconClass="my-ticket" size="20" fill="#333" />
                                    <span className="piao_text">电影票</span>
                                </div>
                                <SvgIcon iconClass="arrow-right" size="18" fill="#999999" />
                           </Link>
                        </li>
                        <li style={{borderBottom:'none'}}></li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default My