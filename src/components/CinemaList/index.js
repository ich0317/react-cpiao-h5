import React from 'react'
import { Link } from 'react-router-dom'
import './index.scss'
import { getDistance } from '@/utils/index'

export const CinemaList = (rowData) => {
    let getPos = JSON.parse(localStorage.getItem("_piaoUserPos"))
    return (
        <Link to="/film">
            <div className="address_list">
                <div className="name_bar">
                    <span className="show_cinema">{rowData.cinema_name}</span>
                    <span className="show_price">{rowData.serve_price}起</span>
                </div>
                <div className="address_bar">
                    <span className="show_address">{rowData.address}</span>
                    {getPos ? <span className="dis">{ (getDistance(rowData.lat, rowData.lng, getPos.lat, getPos.lng) / 1000).toFixed(1)}km</span> : ''}
                </div>
            </div>
        </Link>
    )
}


