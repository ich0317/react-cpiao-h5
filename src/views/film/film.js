import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { WingBlank, SearchBar, ListView } from 'antd-mobile';
import Film from '@/components/FilmList/index.js'
import TabBarWrap from '@/components/TabBar/index.js'
import "./film.scss";

class Home extends Component{
    constructor(props){
        super(props)

        this.state = {
            filmList:[
                {
                    mark:8.8,
                    photo:require('@/assets/2.jpg'),
                    filmName:'双子杀手',
                    vd:'3D',
                    director:'珍妮弗·李  克里斯·巴克',
                    actors:'克里斯汀·贝尔 乔什·加德',
                    long:160
                },
                {
                    mark:9.1,
                    photo:require('@/assets/1.jpg'),
                    filmName:'航海王 领航时代',
                    vd:'中国巨幕',
                    director:'王哈哈 大大大',
                    actors:'路费 索罗 哈士奇',
                    long:121
                }
            ],
            addressList:[
                {
                    cinemaName:'北京华谊兄弟大院',
                    location:'北京市东城区安定门外大街',
                    price:12.5,
                    dis:2.5
                },
                {
                    cinemaName:'奥来的成影院',
                    location:'西城区大瓦房',
                    price:10,
                    dis:1.2
                }
            ],
            tabs:[
                { title: '影片', sub: 0},
                { title: '影院', sub: 1}
            ],
            nowActive:0,
            dataSource0: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            dataSource1: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            height:document.documentElement.clientHeight * 3 / 4
        }
    }

    componentDidMount(){
        this.setState({
            dataSource0: this.state.dataSource0.cloneWithRows(this.state.filmList)
        });
    }

    tagChange(sub){
        this.setState({
            nowActive:sub
        },()=>{
            this.setState({
                ['dataSource' + sub]: this.state['dataSource' + sub].cloneWithRows(sub === 0 ? this.state.filmList : this.state.addressList)
            });
        })
    }

    onEndReached(){
        console.warn(111);
    }

    render(){
        return (
            <div id="film">
                <div className="fixed_top">
                    <WingBlank>
                        <div className="city_selected"><Link to="/city">北京<i className="arrow_down"></i></Link></div>
                        <div className="search_bar"><SearchBar placeholder="搜影片、影院" /></div>
                    </WingBlank>
                    <div className="tabs-bar">
                        {
                            this.state.tabs.map( v => <span className={v.sub === this.state.nowActive ? 'active' : ''} onClick = { this.tagChange.bind(this, v.sub) } key = {v.sub}>{ v.title }</span>)
                        }
                    </div>
                </div>
                {/* <div className="pd_top"></div> */}
                <TabBarWrap content = {<ListView
                    dataSource={this.state['dataSource' + this.state.nowActive]}
                    renderRow={[Film, Address][this.state.nowActive]}
                    pageSize={4}
                    onScroll={() => { console.log('scroll'); }}
                    style={{
                        height: this.state.height,
                        overflow: 'auto',
                    }}
                    scrollRenderAheadDistance={500}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={10}
                />} />
            </div>
        )
    }
}

const Address = (rowData) => {
    return (
        <div className="address_list">
            <div className="name_bar">
                <span className="show_cinema">{rowData.cinemaName}</span>
                <span className="show_price">{rowData.price}起</span>
            </div>
            <div className="address_bar">
                <span className="show_address">{rowData.location}</span>
                <span className="dis">{rowData.dis}km</span>
            </div>
        </div>
    )
}

export default Home