import React, { Component } from "react";
import { FilmInfo } from "@/components/FilmInfo/index.js";
import { Button, Toast, NavBar, Modal } from "antd-mobile";
import { Date2Ts, singleTo0, timestamp2Date } from "@/utils/index.js";
import "./detail.scss";
import { getOrderDetail, payOrder, payExpire } from '@/api/api';
import { ORDER_STATUS } from '@/constants/index';
import { PageLoading } from '@/components/AllLoading/index.js';
import SvgIcon from "@/components/SvgIcon/index.js";

let timer = null;
const ORDER_EXPIRE_VALUE = 300; //过期时间秒
const prompt = Modal.prompt;

class OrderDetail extends Component {
    constructor(props) {
        super();
        this.state = {
            payCd: 0, //支付倒计时
            orderInfo:{},
            payExpire:false //支付是否过期
        };
    }

    componentDidMount() {
        this.order_id = this.props.match.params.order_id;
        this.getDetail();
    }

    componentWillUnmount() {
        clearInterval(timer);
    }

    //获取订单详情
    getDetail(){
        PageLoading.show()
        getOrderDetail({order_id:this.order_id}).then(res=>{
            let { code, msg, data } = res;
            if(code === 0){
                //判断是否完场
                if(data.end_datetime < timestamp2Date(Date.now() / 1000, '{Y}-{M}-{D} {h}:{m}')){
                    data.isEnd = true;
                }else{
                    data.isEnd = false;
                }

                this.setState({
                    orderInfo:data
                })
                data.order_status === ORDER_STATUS.Unpaid && this.cdTime(data.server_datetime, data.order_datetime);
            }else{
                Toast.fail(msg, 1.5);
            }
            PageLoading.hide()
        })
    }

    /**
     * 支付倒计时
     * @param { Date } serverTime 服务器时间
     * @param { Date } orderDatetime 下单时间
     */
    cdTime(serverTime, orderDatetime) {
        let placeOrderTime = Date2Ts(serverTime);
        let cdTime = ORDER_EXPIRE_VALUE + Date2Ts(orderDatetime) - placeOrderTime;
        const cdFn = () => {
            cdTime --
            if (cdTime < 0) {
                clearInterval(timer);
                this.setState({
                    payExpire:true
                })
                payExpire({order_id:this.state.orderInfo._id}).then(res=>{
                    let { code, msg } = res;
                    if(code === 0){
                        Toast.fail(msg, 1.5);
                    }
                })
                return;
            }
            this.setState({
                payCd: cdTime
            });
        };
        timer = setInterval(cdFn, 1000);
        cdFn();
    }

    goBack() {
        require("history")
            .createHashHistory()
            .goBack();
    }

    changeVcode(){
        document.querySelector('.vimg').src = '/api/getPiaoVerifiCode?t='+Math.random()
    }

    //支付
    pay(code){
        PageLoading.show('正在出票')
        payOrder({order_id:this.state.orderInfo._id, verifi_code:code}).then(res=>{
            let { code, msg } = res;
            if(code === 0){
                this.getDetail();
            }else{
                Toast.fail(msg, 1.5);
            }
            PageLoading.hide()
        })
    }

    render() {
        let oInfo = this.state.orderInfo;
        const VerifiCode = ({url}) => <img src = {url} alt="验证码" height="36" className="vimg" onClick = {this.changeVcode} />;

        return (
        <div>
            <NavBar mode="dark" leftContent="返回" onLeftClick={this.goBack}>订单详情</NavBar>
            { oInfo.seat && <div className="pay_page">
                {
                ORDER_STATUS.Unpaid === oInfo.order_status && <div className="cd_time">
                    请在
                    <span className="num">
                        {Math.floor(this.state.payCd / 60)}
                    </span>
                    分
                    <span className="num">
                        {singleTo0(Math.floor(this.state.payCd % 60))}
                    </span>
                    秒中内完成支付
                </div>
                }
                <div className="item_block">
                    <FilmInfo data={{oInfo}}/>
                </div>
                {
                ORDER_STATUS.Paid === oInfo.order_status && <div className="item_block">
                    <div className="item_title">取电影票</div>
                    <div className="qr">
                        <img
                            src={require("@/assets/qr.png")}
                            width="120"
                            height="120"
                            className="lose"
                            alt=""
                        />
                        { this.state.orderInfo.isEnd && <div className="film_over"><SvgIcon iconClass="end" size="48" fill="#cccccc" /></div> }
                    </div>
                    <div className="tickets_num">{oInfo.seat_count}张电影票</div>
                    <div className="get_tickets_code">
                        取票码：{oInfo.order_num}
                    </div>
                </div>
                }
                <div className="item_block">
                    <div className="item_title">订单信息</div>
                    <ul className="order_info">
                        <li>
                            <span>订单号：</span>{oInfo.order_num}
                        </li>
                        {
                        ORDER_STATUS.Paid === oInfo.order_status && <li>
                            <span>付款日期：</span>2018-10-12 09:30:06
                        </li>
                        }
                        <li>
                            <span>总价：</span>{oInfo.total_price}元
                        </li>
                        <li>
                            <span>应付：</span>{oInfo.total_price + oInfo.total_serveprice}元<em>（含服务费{oInfo.total_serveprice / oInfo.seat.length} * {oInfo.seat.length}元）</em>
                        </li>
                    </ul>
                </div>
                <div className="item_block">
                    <div className="item_title">观影须知</div>
                    <ul className="film_notice">
                        <li>· 影票售出后，不支持退换</li>
                        <li>· 请提前打开影票二维码凭码入场</li>
                        <li>· 由于设备故障等不可抗因素，会进行退票退款</li>
                    </ul>
                </div>
                {
                (ORDER_STATUS.Unpaid === oInfo.order_status && !this.state.payExpire) && <div className="pay_btns_wrap">
                    <Button type="warning" onClick={() => prompt(
                    '请输入验证码',
                    <VerifiCode url={`/api/getPiaoPayCode?t=${Math.random()}`} />,
                    [
                        { text: '取消' },
                        { text: '提交', onPress: code => this.pay(code) },
                    ],
                    'default',
                    )}>去付款</Button>
                </div>
                }
            </div>
            }
        </div>
        );
    }
}

export default OrderDetail;
