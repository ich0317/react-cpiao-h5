import React, { Component } from 'react'
import { NavBar,Popover,Icon } from 'antd-mobile';
import City from '@/components/CityList/index.js'

const Item = Popover.Item;

const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt="" />;


 class CityList extends Component {

  state = {
    visible: false,
    selected: '',
    fanxgiang:'bottomRight'
  };
  onSelect = (opt) => {
    // console.log(opt.props.value);
  
    this.setState({
      visible: false,
      selected: opt.props.value,
    });
  };
  aaa(e){
    console.log(111);
  }
  handleVisibleChange = (visible) => {
    console.log(222);
    this.setState({
      visible
    });
  };
  

   goBack(){
    require("history").createHashHistory().goBack();
   }
  render(){
 
    return (
      <div>
        <Popover mask
            overlayClassName="fortest"
            overlayStyle={{ color: 'currentColor' }}
            visible={this.state.visible}
            overlay={[
              (<Item key="4" value="scan" icon={myImg('tOtXhkIWzwotgGSeptou')} data-seed="logId">Scan</Item>),
              (<Item key="5" value="special" icon={myImg('PKAgAqZWJVNwKsAJSmXd')} style={{ whiteSpace: 'nowrap' }}>My Qrcode</Item>),
              (<Item key="6" value="button ct" icon={myImg('uQIYTFeRrjPELImDRrPt')}>
                <span style={{ marginRight: 5 }}>Help</span>
              </Item>),
            ]}
            align={{
              overflow: { adjustY: 0, adjustX: 0 },
              offset: [-10, 0],
            }}
            placement={this.state.fanxgiang}
            onVisibleChange={this.handleVisibleChange.bind(this)}
            onSelect={this.onSelect}
            
          >
            <div style={{
          
          
              float:'left'
            }}
            onClick={this.aaa}
            >
              aaaa
            </div>
          </Popover> 
        <NavBar mode="dark" leftContent="返回" onLeftClick = { this.goBack } >选择城市</NavBar>
        <City />
        
      </div>
      
    )
  }
}

export default CityList
