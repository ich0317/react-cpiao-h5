import React, { Component } from 'react'
import './index.scss'
import { timestamp2Date } from "@/utils/index.js";

export class FilmInfo extends Component {
    render(){
        let filmInfo = (this.props.data && this.props.data.oInfo) || '';
        return (
            <div className="dy_film_block">
                <div className="dy_film_txt">
                    <h3>{filmInfo.film_name}</h3>
                    <div className="dy_film_date">{timestamp2Date(filmInfo.start_datetime, '{M}月{D}日 {h}:{m}')} ~ {timestamp2Date(filmInfo.end_datetime, '{h}:{m}')} {filmInfo.language}</div>
                    <div className="dy_film_screen">{filmInfo.cinema_name} {filmInfo.screen_name}</div>
                    <ul className="dy_film_seat">
                        {
                            filmInfo.seat.map((v, i)=><li key={i}>{v}</li>)
                        }
                    </ul>
                </div>
                <div className="dy_film_photo">
                    <img src={filmInfo.film_photo} alt={filmInfo.film_name}/>
                </div>
            </div>
        )
    }
}