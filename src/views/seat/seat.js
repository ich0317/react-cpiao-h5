import React, { Component } from "react";
import { FilmVersionIcon } from "@/components/FilmVersion/index.js";
import { Button, Toast } from "antd-mobile";
import SvgIcon from "@/components/SvgIcon/index.js";
import { MPDrag } from "@/components/MPDrag/index.js";
import { a } from "@/assets/aaa.js";
import "./seat.scss";

let SEAT_WIDTH = 30;
let SEAT_HEIGHT = 30;
let seatDis = 4;    //座位间距离
let SCALE = 1;  //初始比例
let SEAT_STATUS = new Map([
    [0,'available'],
    [1,'sold'],
    [2,'locked'],
    [3,'forbid'],
    [4,'selected']
])

class Seat extends Component {
    constructor() {
        super();
        this.state = {
            selectedArr: [],
            moveX:0,
            moveY:0
        };
    }

    componentDidMount() {
        this.drawMap();
    }

    //画座位图
    drawMap() {
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

        a.forEach(v => {
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
        SCALE = (this.deviceWidth - (maxGraphCol) * seatDis) / (maxGraphCol * SEAT_WIDTH);
        
        SEAT_WIDTH = SEAT_WIDTH * SCALE;
        SEAT_HEIGHT = SEAT_HEIGHT * SCALE;
        this.WCLOUMN = SEAT_WIDTH + seatDis;
        this.HCLOUMN = SEAT_HEIGHT + seatDis;
  
        //绘制座位图
        this.available.onload = () => {
            this.gd.clearRect(0, 0, this.oMap.width, this.oMap.height);
            
            a.forEach(v => {
                this.gd.drawImage(
                    this[SEAT_STATUS.get(v.seat_status)],
                    (v.graph_col) * this.WCLOUMN,
                    (v.graph_row) * this.HCLOUMN,
                    SEAT_WIDTH,
                    SEAT_HEIGHT
                );

                //添加标识号
                oUl.children[v.graph_row].innerHTML = v.seat_row;
            });

            
            let imgData = this.gd.getImageData(0, 0, 2000, 2000); //复制座位图
            //改变座位图宽高
            this.oMap.width = this.WCLOUMN * maxGraphCol - seatDis;
            this.oMap.height = this.HCLOUMN * maxGraphRow - seatDis;
            //插入标识到页面
            let oMark = document.querySelector('.mark');
            oMark.style.height = this.HCLOUMN * maxGraphRow - seatDis +'px';
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

        let r = a.find(
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
        console.log(getSeat.map(v=>v._id));
    }

    render() {
        return (
            <div className="seat">
                <div className="film_top">
                    <dl className="film_info">
                        <dt>
                            最好的我们&nbsp;
                            <FilmVersionIcon data={{ vd: "3D" }} />
                        </dt>
                        <dd>12月28日 19:00 国语</dd>
                    </dl>
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
                    <Button type="warning" style={{background: this.state.selectedArr.length === 0 ? '#ccc' : ''}} onClick={this.toBuy.bind(this)}>立即支付</Button>
                </div>
            </div>
        );
    }
}

export default Seat;
