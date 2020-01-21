import React, { Component } from 'react'
import { NavBar } from "antd-mobile";
import { PButton } from "@/components/Elements/index"
import "@/style/style.scss"
import { piaoLogin } from '@/api/api';
import Cookies from 'js-cookie'
class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            username:'',
            vcode:'',
            password:''
        }
    }
    componentDidMount() {

    }

    goBack(){
        require("history").createHashHistory().goBack();
    }

    handleChange(event) {
        let oTarget = event.target;

        this.setState({
            [oTarget.name]:oTarget.value
        });
    }

    login(){
        piaoLogin({username:this.state.username, password:this.state.password}).then(res=>{
            let { code, data } = res;
            if(code === 0){
                Cookies.set('_piao_token', data.token)
            }
        })
    }

    //更改验证码
    changeVcode(){
        this.refs.vimg.src = '/api/getPiaoVerifiCode?t='+Math.random()
    }
    render(){
        return (
            <div className="login">
                <NavBar mode="light" leftContent="返回" onLeftClick = { this.goBack } className="page_title">票票登录</NavBar>
                <div className="login_wrap">
                    <div className="input_item">
                        <input placeholder="用户名" name="username" value={this.state.username} onChange={this.handleChange.bind(this)} />
                    </div>
                    <div className="input_item">
                        <input placeholder="密码" name="password" value={this.state.password} onChange={this.handleChange.bind(this)} />
                    </div>
                    {/* <div className="input_item"><input placeholder="验证码" name="vcode" value={this.state.loginInfo.vcode} onChange={this.handleChange.bind(this)} />
                        <span className="vcode" onClick = {this.changeVcode.bind(this)}><img src="/api/getPiaoVerifiCode" ref="vimg" alt="验证码" /></span></div> */}
                    <div className="input_item_btn" onClick={this.login.bind(this)}><PButton >登 录</PButton></div>
                </div>
            </div>
        )
    }
}

export default Login