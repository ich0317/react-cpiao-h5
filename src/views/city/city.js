import React, { Component } from 'react'
import { NavBar } from 'antd-mobile';
import City from '@/components/CityList/index.js'

 class CityList extends Component {
  

   goBack(){
    require("history").createHashHistory().goBack();
   }
  render(){
    return (
      <div>
        <NavBar mode="dark" leftContent="返回" onLeftClick = { this.goBack }>选择城市</NavBar>
        <City />
      </div>
      
    )
  }
}

export default CityList
