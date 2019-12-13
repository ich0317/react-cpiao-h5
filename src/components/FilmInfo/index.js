import React, { Component } from 'react'
import './index.scss'

export class FilmInfo extends Component {
    render(){
        return (
            <div className="dy_film_block">
                <div className="dy_film_txt">
                    <h3>航海王 狂热行动</h3>
                    <div className="dy_film_date">11月30日 13:00 ~ 14:41 日语</div>
                    <div className="dy_film_screen">大地哈哈影院 杜比厅</div>
                    <ul className="dy_film_seat">
                        <li>1排6座</li>
                        <li>1排7座</li>
                        <li>1排6座</li>
                        <li>1排7座</li>
                    </ul>
                </div>
                <div className="dy_film_photo">
                    <img src={require('@/assets/1.jpg')} alt=""/>
                </div>
            </div>
        )
    }
}