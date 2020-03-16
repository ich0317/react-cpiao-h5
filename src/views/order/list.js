import React, { Component } from "react";
import SvgIcon from "@/components/SvgIcon/index.js";
import { Toast, NavBar } from "antd-mobile";
import "./list.scss";
import { getList } from "@/api/api";
import { ORDER_STATUS } from "@/constants/index";
import { PButton } from "@/components/Elements/index";
import { PageLoading } from '@/components/AllLoading/index.js';
import { timestamp2Date } from "@/utils/index.js";

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
        PageLoading.show();
        getList().then(res=>{
            let { code, msg, data } = res;
            if(code === 0){
                data.list.forEach(v=>{
                    if(v.end_datetime < timestamp2Date(Date.now()/1000, '{Y}-{M}-{D} {h}:{m}')){
                        v.isEnd = true;
                    }else{
                        v.isEnd = false;
                    }
                })
                this.setState({
                    list:data.list
                })
                PageLoading.hide();
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
                    this.state.list.map(v => <li onClick={this.toDetail.bind(this, v._id)} key = {v._id} className={v.isEnd ? 'end' : ''}>
                        <div className="list_icon"><SvgIcon iconClass="film" size="28" fill= {v.isEnd ? '#ccc' : '#ff6969'} /></div>
                        <div className="order_info">
                            <div className="film_name">{v.film_name}</div>
                            <div className="play_time">{v.start_datetime}</div>
                            <div className="screen_name">{v.cinema_name}</div>
                            <div className="nums">{v.seat_count}张 {v.total_price}元</div>
                        </div>
                        {
                        v.order_status === ORDER_STATUS.Unpaid && <div className="pay_btn"><PButton>去支付</PButton></div>
                        }
                    </li>)
                }
                </ul>
            </div>
        );
    }
}

export default OrderList;
