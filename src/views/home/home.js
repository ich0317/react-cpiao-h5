import React, { Component } from "react";
import { TabBar, Toast } from "antd-mobile";
import Film from "@/views/film/film.js";
import My from "@/views/my/my.js";
import { getPiaoCinemas, getCinemaSessions } from "@/api/api.js"
import "./home.scss";
import { PageLoading } from '@/components/AllLoading/index.js'
import SvgIcon from "@/components/SvgIcon/index.js";
import Axios from "axios";  //临时可优化

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'film',    //tag名
            sessionsList: null, //场次
            cinemasInfo:{}  //影院信息
        };
    }

    componentDidMount() {
        PageLoading.show();
        Axios.all([this.getCinemasInfo(), this.getCinemaSessions()]).then(Axios.spread(function (acct, perms) {
            // 两个请求现在都执行完成
            PageLoading.hide();
        }));
    }

    //获取影院信息
    getCinemasInfo(){
        getPiaoCinemas().then(res=>{
            let { code, msg, data} = res;
            if(code === 0){
                this.setState({
                    cinemasInfo:data.cinemas[0]
                })
            }else{
                Toast.fail(msg, 1.5);
            }
        })
    }

    //获取影院场次
    getCinemaSessions(){
        getCinemaSessions().then(res=>{
            let { code, msg, data } = res;
            if(code === 0){
                this.setState({
                    sessionsList:data.sessions
                })
            }else{
                Toast.fail(msg, 1.5);
            }
        })
    }

    render() {
        let oDatas = this.state;
        return (
            <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }} id="film">
                <TabBar
                unselectedTintColor="#949494"
                tintColor="#ff6969"
                barTintColor="white"
                tabBarPosition="bottom"
                hidden={oDatas.hidden}
                >
                    <TabBar.Item
                        title="影片"
                        key="影片"
                        icon={<div style={{
                        width: '22px',
                        height: '22px',
                        background: `url(${require("@/assets/film.svg")}) center center /  21px 21px no-repeat` }}
                        />
                        }
                        selectedIcon={<div style={{
                        width: '22px',
                        height: '22px',
                        background: `url(${require("@/assets/film-selected.svg")}) center center /  21px 21px no-repeat` }}
                        />
                        }
                        selected={oDatas.selectedTab === 'film'}
                        onPress={() => {
                        this.setState({
                            selectedTab: 'film',
                        });
                        }}
                        data-seed="logId"
                    >
                        <div className="film_top">

                            <div className="welcome">
                                <div>
                                    <div className="welcome_cpiao">
                                        欢迎来到<b>{oDatas.cinemasInfo.cinema_name}</b>
                                    </div>
                                    <div className="address">
                                    {oDatas.cinemasInfo.address}
                                    </div>
                                </div>
                                <div className="location_icon">
                                    <SvgIcon iconClass="location" size="22" />
                                </div>
                            </div>
                            <div className="film_title">
                                正在热映
                            </div>
          
                        </div>
                        
                        { oDatas.sessionsList && <Film data= {oDatas.sessionsList}/> }

                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                        <div style={{
                            width: '22px',
                            height: '22px',
                            background: `url(${require("@/assets/my.svg")}) center center /  21px 21px no-repeat` }}
                        />
                        }
                        selectedIcon={
                        <div style={{
                            width: '22px',
                            height: '22px',
                            background: `url(${require("@/assets/my-selected.svg")}) center center /  21px 21px no-repeat` }}
                        />
                        }
                        title="我的"
                        key="我的"
                        selected={oDatas.selectedTab === 'my'}
                        onPress={() => {
                        this.setState({
                            selectedTab: 'my',
                        });
                        }}
                        data-seed="logId1"
                    >
                        <My />
                    </TabBar.Item>
                </TabBar>
            </div>
        );
    }
}

export default Home;
