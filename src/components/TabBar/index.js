import React, { Component }from 'react'
import { TabBar, WingBlank } from 'antd-mobile';

import "./index.scss";
class TabBarWrap extends Component {
    constructor(props, context){
        super(props, context);
        this.state = {
            selectedTab: 'film',
            hidden: false,
            fullScreen: false
        }
        
    }
    render(){
        return (<div className="top_scroll"><TabBar
            unselectedTintColor="#949494"
            tintColor="#ff6969"
            barTintColor="white"
            
          >
              <TabBar.Item
                  title="电影"
                  key="film"
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
                  selected={this.state.selectedTab === 'film'}
                  onPress={() => {
                  this.setState({
                      selectedTab: 'film',
                  });
                  }}
                  data-seed="logId"
              >
              <WingBlank>{this.props.content}</WingBlank>
              </TabBar.Item>
              <TabBar.Item
                  title="发现"
                  key="find"
                  icon={<div style={{
                  width: '22px',
                  height: '22px',
                  background: `url(${require("@/assets/find.svg")}) center center /  21px 21px no-repeat` }}
                  />
                  }
                  selectedIcon={<div style={{
                  width: '22px',
                  height: '22px',
                  background: `url(${require("@/assets/find-selected.svg")}) center center /  21px 21px no-repeat` }}
                  />
                  }
                  selected={this.state.selectedTab === 'find'}
                  onPress={() => {
                  this.setState({
                      selectedTab: 'find',
                  });
                  }}
                  data-seed="logId"
              >
                 {this.props.find}
              </TabBar.Item>
              <TabBar.Item
                  title="我的"
                  key="my"
                  icon={<div style={{
                  width: '22px',
                  height: '22px',
                  background: `url(${require("@/assets/my.svg")}) center center /  21px 21px no-repeat` }}
                  />
                  }
                  selectedIcon={<div style={{
                  width: '22px',
                  height: '22px',
                  background: `url(${require("@/assets/my-selected.svg")}) center center /  21px 21px no-repeat` }}
                  />
                  }
                  selected={this.state.selectedTab === 'my'}
                  onPress={() => {
                  this.setState({
                      selectedTab: 'my',
                  });
                  }}
                  data-seed="logId"
              >
                 
              </TabBar.Item>
          </TabBar></div>)
    }
}

export default TabBarWrap