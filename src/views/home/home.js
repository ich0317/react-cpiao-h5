import React, { Component } from "react";
import { Link } from "react-router-dom";
import { WingBlank, SearchBar, ListView, Modal, Toast } from "antd-mobile";
import Film from "@/components/FilmList/index.js";
import { CinemaList } from "@/components/CinemaList/index.js";
import TabBarWrap from "@/components/TabBar/index.js";
import Find from "@/views/find/find";
import My from "@/views/my/my";
import "./home.scss";
import { getPiaoFilm, getPiaoCinemas } from "@/api/api";
import { PageLoading } from '@/components/AllLoading/index.js'

const confirmBox = Modal.alert;

let geolocation = new window.QMap.maps.Geolocation(
    "EZMBZ-A4MEX-MWA4L-T4MZK-66OO5-3OBTD",
    "film"
);

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filmList: [],
            addressList: [],
            tabs: [{ title: "影片", sub: 0 }, { title: "影院", sub: 1 }],
            nowActive: 0, //tab切换 0影片 1影院
            dataSource0: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            }), //影片数据
            dataSource1: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            }), //影院数据
            height: (document.documentElement.clientHeight * 3) / 4,
            nowCity: ""
        };
    }

    componentDidMount() {
        this.getPos = JSON.parse(localStorage.getItem("_piaoUserCity")) || ''; //获取存贮位置
        let { city } = this.props.match.params; //获取用户点击位置
        let nowCity = city || this.getPos ? this.getPos.city : '';
        
        //如果选择城市，没有则跳转城市页
        if (nowCity) {
            this.setState({
                nowCity
            },()=>{
                this.getHomeData();
            });
        }
        PageLoading.show();
        this.locationUser();
    }
    //定位
    locationUser() {
        let that = this;
        
        let isUse = (that.props.location.state && that.props.location.state.use) ? true : this.getPos ? true : false;    //是否提示用户位置以改变 true不提示 false提示
        
        geolocation.getLocation(
            function(res) {
                
                if (that.getPos) {
                    //非第一次定位
                    if (that.getPos.city !== res.city && !isUse) {
                        //此用户市级位置改变
                        that.confirmPos(res);
                    }
                } else {
                    //第一次定位
                    that.confirmPos(res);
                }
            },
            function(err) {
                if (!that.getPos) {
                    //第一次定位失败
                    Toast.fail("获取位置失败", 1.5);
                }
            }
        );
    }
    //定位确认弹窗
    confirmPos(res) {
        return confirmBox("当前定位 " + res.city, "是否选择？", [
            { text: "取消", onPress: () => this.cancelSelect() },
            { text: "选择", onPress: () => this.selectActivePos(res) }
        ]);
    }

    //存储用户定位并跳转
    selectActivePos({ city, lat, lng }) {
        localStorage.setItem(
            "_piaoUserCity",
            JSON.stringify({ city })
        );
        localStorage.setItem(
            "_piaoUserPos",
            JSON.stringify({posCity:city, lat, lng })
        );
        this.setState({
            nowCity:city
        },()=>this.getHomeData())
        
    }

    //取消定位
    cancelSelect(){
        PageLoading.hide();
        this.props.history.push("/city", { first: true });
    }
    //获取首页数据
    getHomeData() {
        getPiaoFilm({city: this.state.nowCity}).then(res => {
            let { code, msg, data } = res;
            if (code === 0) {
                this.setState({
                    filmList: data.sessions,
                    dataSource0: this.state.dataSource0.cloneWithRows(
                        data.sessions
                    )
                });
            }else{
                Toast.fail(msg, 1.5);
            }
            PageLoading.hide();
        });
    }

    /**
     * tab切换
     * @param { Number } sub
     */
    tagChange(sub) {
        if(sub === 0){
            PageLoading.show();
            this.getHomeData();
        }else if (sub === 1){
            PageLoading.show();
            getPiaoCinemas({city: this.state.nowCity}).then(res=>{
                let { code, msg, data } = res;
                if (code === 0) {
                    this.setState({
                        filmList: data.cinemas,
                        dataSource1: this.state.dataSource0.cloneWithRows(
                            data.cinemas
                        )
                    });
                }else{
                    Toast.fail(msg, 1.5);
                }
                PageLoading.hide();
            })
        }
        this.setState(
            {
                nowActive: sub
            },
            () => {
                this.setState({
                    ["dataSource" + sub]: this.state[
                        "dataSource" + sub
                    ].cloneWithRows(
                        sub === 0 ? this.state.filmList : this.state.addressList
                    )
                });
            }
        );
    }

    goSelectCinema() {}

    onEndReachedFilm() {}
    onEndReachedCinema() {}

    render() {
        return (
            <TabBarWrap
                content={
                    <div id="film">
                        <div className="fixed_top">
                            <WingBlank>
                                <div className="city_selected">
                                    <Link to="/city">
                                        {this.state.nowCity}
                                        <i className="arrow_down"></i>
                                    </Link>
                                </div>
                                <div className="search_bar">
                                    <SearchBar placeholder="搜影片、影院" />
                                </div>
                            </WingBlank>
                            <div className="tabs-bar">
                                {this.state.tabs.map(v => (
                                    <span
                                        className={
                                            v.sub === this.state.nowActive
                                                ? "active"
                                                : ""
                                        }
                                        onClick={this.tagChange.bind(
                                            this,
                                            v.sub
                                        )}
                                        key={v.sub}
                                    >
                                        {v.title}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="pd_top">
                            <ListView
                                dataSource={this.state.dataSource0}
                                renderRow={Film}
                                pageSize={4}
                                onScroll={() => {
                                    console.log("scroll");
                                }}
                                style={{
                                    height: this.state.height,
                                    overflow: "auto",
                                    display:
                                        this.state.nowActive === 0
                                            ? "block"
                                            : "none"
                                }}
                                scrollRenderAheadDistance={500}
                                onEndReached={this.onEndReachedFilm}
                                onEndReachedThreshold={10}
                            />
                            <ListView
                                dataSource={this.state.dataSource1}
                                renderRow={CinemaList}
                                pageSize={4}
                                onScroll={() => {
                                    console.log("scroll");
                                }}
                                style={{
                                    height: this.state.height,
                                    overflow: "auto",
                                    display:
                                        this.state.nowActive === 1
                                            ? "block"
                                            : "none"
                                }}
                                scrollRenderAheadDistance={500}
                                onEndReached={this.onEndReachedCinema}
                                onEndReachedThreshold={10}
                            />
                        </div>
                    </div>
                }
                find={<Find />}
                my={<My />}
            />
        );
    }
}

export default Home;
