import React, { Component } from "react";
import { FilmVersionIcon } from "@/components/FilmVersion/index.js";
import { Button, Toast, NavBar } from "antd-mobile";
import SvgIcon from "@/components/SvgIcon/index.js";
import { MPDrag } from "@/components/MPDrag/index.js";
import "./seat.scss";
import { getSeatMap, createOrder } from '@/api/api';
import { PageLoading } from '@/components/AllLoading/index.js'
import { timestamp2Date } from "@/utils/index";

let SEAT_WIDTH = 30;
let SEAT_HEIGHT = 30;
let seatDis = 4;    //座位间距离
let SCALE = 1;  //初始比例
let SEAT_STATUS = new Map([
    [0,'available'],    //可用
    [1,'sold'],     //已售
    [2,'locked'],   //锁定
    [3,'forbid'],   //不可售
    [4,'selected']  //已选
])

class Seat extends Component {
    constructor() {
        super();
        this.state = {
            selectedArr: [],
            moveX:0,
            moveY:45,
            sessionInfo:{}
        };
    }

    componentDidMount() {
        let aParams = this.props.match.params;
        this.screen_id = aParams.screen_id;
        this.session_id = aParams.session_id;
        this.getPiaoSeatMap();
    }
    
    //获取座位数据
    getPiaoSeatMap(){
        PageLoading.show();
        getSeatMap({screen_id: this.screen_id,session_id:this.session_id}).then(res=>{
            let { code, msg, data } = res;
            if(code === 0){
                this.drawMap(data.seats);
                this.seats = data.seats;
                this.setState({
                    sessionInfo: data.session
                })
                PageLoading.hide();
            }else{
                Toast.fail(msg, 1.5);
            }            
        })
    }

    //画座位图
    drawMap(seats) {
        this.oMap = this.refs.test;
        this.gd = this.oMap.getContext("2d");
        this.available = new Image();
        this.selected = new Image();
        this.sold = new Image();
        this.locked = new Image();
        this.available.src = require("@/assets/available.png");
        this.selected.src = require("@/assets/selected.png");
        this.sold.src = require("@/assets/sold.png");
        this.locked.src = require("@/assets/locked.png");
        this.deviceWidth = document.documentElement.clientWidth;

        let maxGraphRow = 0;  //最大行数
        let maxGraphCol = 0;  //最大列数

        seats.forEach(v => {
            maxGraphRow =
                parseInt(v.graph_row) > maxGraphRow ? v.graph_row : maxGraphRow;
            maxGraphCol =
                parseInt(v.graph_col) > maxGraphCol ? v.graph_col : maxGraphCol;
        });
        
        //添加标识
        let oUl = document.createElement('ul');
        for(let i=0; i <= maxGraphRow; i++){
            let aLi = document.createElement('li');
            oUl.appendChild(aLi);
        }
        
        //计算座位图在一屏内显示缩放比例
        SCALE = (this.deviceWidth - (maxGraphCol * 1 + 1) * seatDis + seatDis) / ((maxGraphCol * 1 + 1) * SEAT_WIDTH);
        
        SEAT_WIDTH = SEAT_WIDTH * SCALE;
        SEAT_HEIGHT = SEAT_HEIGHT * SCALE;
        this.WCLOUMN = SEAT_WIDTH + seatDis;
        this.HCLOUMN = SEAT_HEIGHT + seatDis;
  
        //绘制座位图
        this.available.onload = () => {
            
            this.gd.clearRect(0, 0, this.oMap.width, this.oMap.height);
            
            seats.forEach(v => {
                this.gd.drawImage(
                    this[SEAT_STATUS.get(v.seat_status)],
                    (v.graph_col) * this.WCLOUMN,
                    (v.graph_row) * this.HCLOUMN,
                    SEAT_WIDTH,
                    SEAT_HEIGHT
                );

                if(v.seat_status === 4){
                    this.setState({
                        selectedArr:this.state.selectedArr.concat(v)
                    })
                }

                //添加标识号
                oUl.children[v.graph_row].innerHTML = v.seat_row;
            });

            
            let imgData = this.gd.getImageData(0, 0, 2000, 2000); //复制座位图
            //改变座位图宽高
            this.oMap.width = this.WCLOUMN * (maxGraphCol * 1 + 1) - seatDis;
            this.oMap.height = this.HCLOUMN * (maxGraphRow * 1 + 1) - seatDis;
            
            //插入标识到页面
            let oMark = document.querySelector('.mark');
            oMark.style.height = this.HCLOUMN * (maxGraphRow * 1 + 1) - seatDis +'px';
            oMark.appendChild(oUl);

            this.gd.putImageData(imgData, 0, 0);    //粘贴座位图
        }; 

    }

    //点选座位
    selectedSeat(e) {
        let dx = e.pageX - this.oMap.getBoundingClientRect().left;
        let dy = e.pageY - this.oMap.getBoundingClientRect().top;

        // let xPos = Math.ceil(dx/(SEAT_WIDTH + 2));   //第二种方法
        // let yPos = Math.ceil(dy/(SEAT_HEIGHT + 2));

        let r = this.seats.find(
            v =>
                dy >= (v.graph_row) * this.HCLOUMN &&
                dy <= (v.graph_row) * this.HCLOUMN + SEAT_HEIGHT &&
                dx >= (v.graph_col) * this.WCLOUMN &&
                dx <= (v.graph_col) * this.WCLOUMN + SEAT_WIDTH
        );

        if (!r || ([1, 2, 3].includes(r.seat_status))) return;

        let getSelected = this.state.selectedArr;

        let rr = getSelected.findIndex(v => v._id === r._id);

        if (rr === -1) {
            //选中
            if (getSelected.length === 4) {
                Toast.info("一次最多可买4张", 1);
                return;
            }

            this.addSeat(r);
            
        } else {
            //取消
            this.removeSeat(r._id)
        }
    }

    addSeat(seatInfo){
    
        this.setState(v => ({
            selectedArr:[...this.state.selectedArr, seatInfo]
        }),()=>{
            this.state.selectedArr.forEach(v => {
                this.gd.clearRect((v.graph_col) * this.WCLOUMN, (v.graph_row) * this.HCLOUMN, SEAT_WIDTH, SEAT_HEIGHT);
                this.gd.drawImage(
                    this.selected,
                    (v.graph_col) * this.WCLOUMN,
                    (v.graph_row) * this.HCLOUMN,
                    SEAT_WIDTH,
                    SEAT_HEIGHT
                );
            });
        });
        
    }

    removeSeat(_id) {
        let getSelected = this.state.selectedArr;
        let rr = getSelected.findIndex(v => v._id === _id);
        let delDom = getSelected.splice(rr, 1)[0];
        this.setState({
            selectedArr: getSelected
        },()=>{
            this.gd.clearRect((delDom.graph_col) * this.WCLOUMN, (delDom.graph_row) * this.HCLOUMN, SEAT_WIDTH, SEAT_HEIGHT);
            this.gd.drawImage(
                this.available,
                (delDom.graph_col) * this.WCLOUMN,
                (delDom.graph_row) * this.HCLOUMN,
                SEAT_WIDTH,
                SEAT_HEIGHT
            );
        });
    }

    dragMove(x,y){
        this.setState({
            moveX:x,
            moveY:y
        })
    }

    toBuy(){
        let getSeat = this.state.selectedArr;
        if(getSeat.length === 0){
            Toast.info("请选择座位", 1);
            return;
        }
        PageLoading.show('正在提交订单..')

        createOrder({seats:getSeat.map(v=>v._id), session_id:this.session_id}).then(res=>{
            let { code, msg, data } = res;
            if(code === 0){
                this.props.history.push(`/order/detail/${data.order_id}`);
            }else{
                Toast.fail(msg, 1.5);
                this.getPiaoSeatMap();
            }
            PageLoading.hide()
        })
    }

    goBack() {
        require("history").createHashHistory().goBack();
    }

    render() {
        const oSessionInfo = this.state.sessionInfo;
        return (
            <div className="seat">
                <div className="fix_top">
                    <NavBar mode="dark" leftContent="返回" onLeftClick={this.goBack}>{oSessionInfo.film_name}</NavBar>
                    <div className="film_top">
                    {
                        oSessionInfo.start_datetime && <dl className="film_info">
                                <dt>
                                    {oSessionInfo.film_name}&nbsp;
                                    <FilmVersionIcon data={{ vd: oSessionInfo.film_version }} />
                                </dt>
                                <dd>{timestamp2Date(oSessionInfo.start_datetime, '{M}月{D}日 {h}:{m}')} {oSessionInfo.language}</dd>
                            </dl>
                        }
                    </div>
                </div>
                <div className="seat_box">
                    <div className="screen_center" style={{fontSize: "12px", transform:'translate3d('+this.state.moveX+'px,0,0)'}}>大屏幕</div>
                    <MPDrag dragMove={this.dragMove.bind(this)} initTop = "30">
                        <canvas
                            width="2000"
                            height="2000"
                            id="seat_map"
                            ref="test"
                            onClick={this.selectedSeat.bind(this)}
                        ></canvas>
                    </MPDrag>
                    <div className="mark" style={{transform:'translate3d(0,'+this.state.moveY+'px,0)'}}></div>
                </div>

                <div className="seat_foot">
                    <ul className="selected_seat">
                        {this.state.selectedArr.map(v => (
                            <li key={v._id}>
                                <div
                                    className="s"
                                    onClick={this.removeSeat.bind(
                                        this,
                                        v._id
                                    )}
                                >
                                    {v.seat_row}排{v.seat_col}座
                                    <span>
                                        <SvgIcon iconClass="close" size="16" />
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <Button type="warning" style={{background: this.state.selectedArr.length === 0 ? '#ccc' : ''}} onClick={this.toBuy.bind(this)} >立即支付</Button>
                </div>
            </div>
        );
    }
}

export default Seat;
