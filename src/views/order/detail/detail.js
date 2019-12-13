import React, { Component } from "react";
import { FilmInfo } from '@/components/FilmInfo/index.js'
import './detail.scss'

class OrderDetail extends Component {
    render(){
        return(
            <div>
                <div className="item_block">
                    <FilmInfo />
                </div>
                <div className="item_block">
                    <div className="item_title">订单信息</div>
                    <ul className="order_info">
                        <li>
                            <span>订单号：</span>123456789632145
                        </li>
                        <li>
                            <span>总价：</span>30元
                        </li>
                        <li>
                            <span>应付：</span>30元<em>（含服务费2元）</em>
                        </li>
                    </ul>
                </div>
                <div className="item_block">
                    <div className="item_title">观影须知</div>
                    <ul className="film_notice">
                        <li>· 影票售出后，不支持退换</li>
                        <li>· 请提前打开影票二维码凭码入场，避免观影人数过多滞留场外</li>
                        <li>· 由于设备故障等不可抗因素，会进行退票退款</li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default OrderDetail