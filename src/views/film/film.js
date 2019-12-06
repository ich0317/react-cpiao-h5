import React, { Component } from "react";
import { Tabs, Button, NavBar } from "antd-mobile";
import SvgIcon from "@/components/SvgIcon/index.js";
import { Swiper as SwiperFilm } from "@/components/Swiper/index.js";
import "./film.scss";

class Film extends Component {
  constructor(props) {
    super(props);
    this.state = {
      film: [
        {
          img: require("@/assets/1.jpg")
        },
        {
          img: require("@/assets/2.jpg")
        }
      ]
    };
  }

  swiperChangeIndex(idx) {
    console.log(idx);
  }

  goBack(){
    require("history").createHashHistory().goBack();
   }

  render() {
    const DateTitle = ({ date }) => {
      return (
        <div>
          <p className="play_day">{date.day}</p>
          <p className="play_date">{date.date}</p>
        </div>
      );
    };
    const tabs = [
      { title: <DateTitle date={{ day: "今天", date: "12-10" }} /> },
      { title: <DateTitle date={{ day: "明天", date: "12-11" }} /> },
      { title: <DateTitle date={{ day: "后天", date: "12-12" }} /> }
    ];
    return (
      <div className="film_page">
        <NavBar mode="dark" leftContent="返回" onLeftClick = { this.goBack }>选择城市</NavBar>
        <div className="film_top">
          <dl>
            <dt>洋桥华谊影院</dt>
            <dd>北京市东城区前门东大街3号</dd>
          </dl>
          <div className="place">
            <SvgIcon iconClass="place" size="46" />
          </div>
        </div>
        <div className="swiper_film">
          <SwiperFilm
            data={this.state.film}
            swiperChangeIndex={this.swiperChangeIndex.bind(this)}
          />
        </div>
        <div className="film_intro">
          <h3 className="film_name">航海王 这串深思</h3>
          <p>110分钟 | 动画/冒险 | 张一抹/李易峰</p>
        </div>
        <Tabs
          tabs={tabs}
          initialPage={0}
          onChange={(tab, index) => {
            console.log("onChange", index, tab);
          }}
          onTabClick={(tab, index) => {
            console.log("onTabClick", index, tab);
          }}
          tabBarActiveTextColor="#000"
          tabBarUnderlineStyle={{ borderColor: "#ff6969" }}
        >
          <div>
            <ul className="film_item">
              <li>
                <div className="info_part">
                  <div className="item_top">
                    <span className="start_time">11:20</span>
                    <span className="language">国语 中国巨幕</span>
                  </div>
                  <div className="item_bottom">
                    <span className="end_time">18:44散场</span>
                    <span className="screen">1号大厅</span>
                  </div>
                </div>
                <div className="film_price">
                  <div className="sub">
                    ￥<b>12</b>&nbsp;起
                  </div>
                </div>
                <div className="buy_btn">
                  <Button type="warning" inline size="small" href="/seat">
                    购票
                  </Button>
                </div>
              </li>
              <li>
                <div className="info_part">
                  <div className="item_top">
                    <span className="start_time">11:20</span>
                    <span className="language">国语 3D</span>
                  </div>
                  <div className="item_bottom">
                    <span className="end_time">18:44散场</span>
                    <span className="screen">5号按摩椅厅</span>
                  </div>
                </div>
                <div className="film_price">
                  <div className="sub">
                    ￥<b>120</b>&nbsp;起
                  </div>
                </div>
                <div className="buy_btn">
                  <Button type="warning" inline size="small" href="/seat">
                    购票
                  </Button>
                </div>
              </li>
            </ul>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "150px",
              backgroundColor: "#fff"
            }}
          >
            2
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "150px",
              backgroundColor: "#fff"
            }}
          >
            3
          </div>
        </Tabs>
      </div>
    );
  }
}

export default Film;
