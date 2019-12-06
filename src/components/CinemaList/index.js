import React from 'react'
import { Link } from 'react-router-dom'
import './index.scss'

export const CinemaList = (rowData) => {
    return (
        <Link to="/film">
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
        </Link>
    )
}


