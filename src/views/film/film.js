import React, { Component } from "react";
import { Tabs, Toast } from "antd-mobile";
import { Swiper as SwiperFilm } from "@/components/Swiper/index.js";
import "./film.scss";
import { findInArr, Date2Ts, timestamp2Date } from "@/utils/index";
import { PButton } from "@/components/Elements/index";
import SvgIcon from "@/components/SvgIcon/index.js";

class Film extends Component {
  constructor(props) {
    super(props);
    this.state = {
      film: [], //影片信息
      cinemaInfo:{},  //影院信息
      filmIdx:0,  //当前影片位置
      dateIdx:0,  //当前排期位置（选项卡）
      initPage:null //初始化影片位置
    };
    
  }

  componentDidMount(){
    this.setState({
        initPage:0,
        film:this.formatFilmData(this.props.data)
    })
  }

  swiperChangeIndex(idx) {
    this.setState({
      filmIdx:idx,
      dateIdx:0
    })
  }
  
  //数据格式转换
  formatFilmData(list) {
    let arr = [];

    /**
     * 找出数组中开场时间为同一天的
     * @param {Array} oldArr 
     * @param {Array} newArr 
     */
    const sameDay = (oldArr, newArr) => {
      let n = 0;
      oldArr.forEach((v, i)=>{
        if(v._start_datetime === newArr._start_datetime){
          n = i.toString()
        }else{
          n = false;
        }
      })
      return n;
    }

    /**
     * 开场时间转汉字、星期
     * @param {Date} targetDate 开场时间 Y-M-D s:m:s 
     */
    const day2Cn = (targetDate) =>{
      let today = timestamp2Date(Date.now() / 1000,'{Y}-{M}-{D}')
      if(Date2Ts(today) === Date2Ts(targetDate)){
        return '今天'
      }else if(Date2Ts(today) + 86400 === Date2Ts(targetDate)){
        return '明天'
      }else if(Date2Ts(today) + 86400 * 2 === Date2Ts(targetDate)){
        return '后天'
      }else{
        return '周' + timestamp2Date(Date2Ts(targetDate),'{w}')
      }
    }

    list.forEach(v => {
      let json = {
        film_name: v.film_name,
        film_photo: v.film_photo,
        film_long: v.film_long,
        film_type: v.film_type,
        actors: v.actors,
        brief: v.brief,
        film_id: v.film_id
      };
      json.children = [
        {
          _start_datetime:(v.start_datetime).split(' ')[0],
          _start_date:timestamp2Date(Date2Ts(v.start_datetime),'{M}-{D}'),
          _start_dateCn: day2Cn((v.start_datetime).split(' ')[0]),
          children:[
            {
              start_datetime: v.start_datetime,
              end_datetime: v.end_datetime,
              screen_name: v.screen_name,
              language: v.language,
              film_version: v.film_version,
              sell_price: v.sell_price,
              session_id: v._id,
              screen_id: v.screen_id,
              _end_datetime:(v.end_datetime).split(' ')[0]
            }
          ]
        }
      ];

      let findIdx = findInArr(arr, json, "film_id");
      
      if (findIdx === -1) {
        arr.push(json);

      } else {
        let n = sameDay(arr[findIdx].children, json.children[0]);
        if(n){
          //重了
          arr[findIdx].children[n].children.push(json.children[0].children[0]);
        }else{
          //没重
          arr[findIdx].children = arr[findIdx].children.concat(json.children);
        }
      }
    });
    return arr;
  }
  goBack(){
    require("history").createHashHistory().goBack();
   }

  render() {
    let aFilm = this.state.film;
    const DateTitle = ({ date }) => {
      return (
        <div>
          <p className="play_day">{date.day}</p>
          <p className="play_date">{date.date}</p>
        </div>
      );
    };

    let activeData = aFilm[this.state.filmIdx];
    let tabs = [];
    if(aFilm.length){
      tabs = activeData.children.map(v=>{
        return {
          title: <DateTitle date={{ day: v._start_dateCn, date:v._start_date }} />
        }
      })
    }

    return (
      <div>
        { aFilm.length === 0 ? 
        <div className="nodata"><SvgIcon iconClass="nothing" size="60" /><p className="no_text">暂无电影排片</p></div> :
        <div className="film_page">
          <div className="swiper_film">
          {this.state.initPage !== null ? <SwiperFilm
              data={aFilm}
              initPage={this.state.initPage}
              swiperChangeIndex={this.swiperChangeIndex.bind(this)}
            /> : ''}
          </div>

          <div className="film_intro">
            {activeData ? <h3 className="film_name">{activeData.film_name}</h3> : ''}
            {activeData ? <p>{activeData.film_long}分钟 | {activeData.film_type} | {activeData.actors}</p> : ''}
          </div>
          
          {aFilm.length ? <Tabs
            tabs={tabs}
            initialPage={0}
            page={this.state.dateIdx}
            onChange={(tab, index) => {
              this.setState({
                dateIdx:index
              })
            }}
            onTabClick={(tab, index) => {
              console.log("onTabClick", index, tab);
            }}
            tabBarActiveTextColor="#000"
            tabBarUnderlineStyle={{ borderColor: "#ff6969" }}
          >
            {
            activeData.children.map((v, i)=><div key={i}>
              <ul className="film_item">
              {
                
                activeData.children[this.state.dateIdx].children.map(v => <li key={v.session_id}>
                  <div className="info_part">
                    <div className="item_top">
                      <span className="start_time">{v.start_datetime.split(' ')[1]}</span>
                      <span className="language">{v.language} {v.film_version}</span>
                    </div>
                    <div className="item_bottom">
                      <span className="end_time">{v.end_datetime.split(' ')[1]}散场</span>
                      <span className="screen">{v.screen_name}</span>
                    </div>
                  </div>
                  <div className="film_price">
                    <div className="sub">
                      ￥<b>{v.sell_price}</b>&nbsp;起
                    </div>
                  </div>
                  <div className="buy_btn">
                    <PButton to={`/seat/${v.session_id}/${v.screen_id}`}>
                      购票
                    </PButton>
                  </div>
                </li>)
              }
              </ul>
            </div>)}
          </Tabs> : ''}
        </div>
        }
      </div>
    );
  }
}

export default Film;
