import React, { Component } from "react";
import { NavBar } from "antd-mobile";
import City from "@/components/CityList/index.js";

class CityList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backVisible: false  //是否显示返回按钮,true显示,false不显示
        }
    }

    componentDidMount(){
      let locationState = this.props.location.state;
      if(locationState && locationState.first){
        this.setState({
          backVisible:false
        })
      }else{
        this.setState({
          backVisible:true
        })
      }
    }
    goBack() {
        require("history")
            .createHashHistory()
            .goBack();
    }
    render() {
        return (
            <div>
              {this.state.backVisible ? <NavBar
                    mode="dark"
                    leftContent="返回"
                    onLeftClick={this.goBack}
                >
                    选择城市
                </NavBar> : <NavBar mode="dark">选择城市</NavBar>}
                <City />
            </div>
        );
    }
}

export default CityList;
