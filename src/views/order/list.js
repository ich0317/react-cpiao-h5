import React, { Component } from "react";
import SvgIcon from "@/components/SvgIcon/index.js";
import { Button, Toast, NavBar } from "antd-mobile";
import "./list.scss";
import { getList } from "@/api/api";
import { ORDER_STATUS } from "@/constants/index";

class OrderList extends Component {
    constructor(props){
        super()
        this.state = {
            list:[]
        }
    }

    componentDidMount(){
        this.getOrder();
    }
    
    getOrder(){
        getList().then(res=>{
            let { code, msg, data } = res;
            if(code === 0){
                this.setState({
                    list:data.list
                })
            }else{
                Toast.fail(msg, 1.5);
            }
        })
    }

    toDetail(id){
        this.props.history.push(`/order/detail/${id}`);
    }

    goBack() {
        require("history").createHashHistory().goBack();
    }

    render() {
        return (
            <div className="order_list">
            <NavBar mode="dark" leftContent="返回" onLeftClick={this.goBack}>电影票</NavBar>
                <ul className="order_wrap clearfix">
                {
                    this.state.list.map(v => <li onClick={this.toDetail.bind(this, v._id)} key = {v._id}>
                        <div className="list_icon"><SvgIcon iconClass="film" size="24" fill="#ff6969" /></div>
                        <div className="order_info">
                            <div className="film_name">{v.film_name}</div>
                            <div className="play_time">{v.start_datetime}</div>
                            <div className="screen_name">{v.cinema_name}</div>
                            <div className="nums">{v.seat_count}张 {v.total_price}元</div>
                        </div>
                        {
                        v.order_status === ORDER_STATUS.Unpaid && <div className="pay_btn"><Button type="warning" size="small">支付</Button></div>
                        }
                    </li>)
                }
                </ul>
            </div>
        );
    }
}

export default OrderList;
