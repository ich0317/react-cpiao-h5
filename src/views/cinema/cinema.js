import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getPiaoCinemas } from "@/api/api"
import { getDistance } from '@/utils/index'
import { NavBar, Toast } from "antd-mobile";
import './cinema.scss'

class Cinema extends Component {
    constructor(props){
        super()
        this.state = {
            cinemaList:[],
            filmName:''
        }
    }
    componentDidMount(){
        this.getPos = JSON.parse(localStorage.getItem("_piaoUserPos"));
        this.setState({
            filmName:this.props.match.params.film_name
        })
        this.getCinemas();
    }
    getCinemas(){
        this.film_id = this.props.match.params.film_id;
        getPiaoCinemas({film_id:this.film_id}).then(res=>{
            let { code, msg, data } = res;
            if (code === 0) {
                data.cinemas.forEach(v=>{
                    v.dis = (getDistance(v.lat, v.lng, this.getPos.lat, this.getPos.lng) / 1000).toFixed(1)
                })
                this.setState({
                    cinemaList: data.cinemas.sort((a,b) => a.dis - b.dis)
                });
            }else{
                Toast.fail(msg, 1.5);
            }
        })
    }
    goBack() {
        require("history")
            .createHashHistory()
            .goBack();
    }
    render(){
        
        return (
            <div>
                <NavBar mode="dark" leftContent="返回" onLeftClick={this.goBack} >{this.state.filmName}</NavBar>
            
                <div className="cinema_wrap_list">
                {
                    this.state.cinemaList.map(v=><Link to={`/film/${v._id}/${this.film_id}`} key={v._id}>
                    <div className="address_list">
                        <div className="name_bar">
                            <span className="show_cinema">{v.cinema_name}</span>
                            <span className="show_price">{v.serve_price}起</span>
                        </div>
                        <div className="address_bar">
                            <span className="show_address">{v.address}</span>
                            {this.getPos ? <span className="dis">{v.dis}km</span> : ''}
                        </div>
                    </div>
                </Link>)
            }</div>
        </div>
        )
    }
}

export default Cinema