import React from 'react'
import { FilmVersionIcon } from '@/components/FilmVersion/index.js'
import { PButton } from "@/components/Elements/index"
import "./index.scss"

const Film = (rowData) => {
    return (
        <div className="dy_pro_list">
            <img src = {rowData.film_photo} alt="1" className="dy_film_photo" />
            <div className="dy_content">
                <div className="dy_title">
                    <h3 className="dy_show_name">{rowData.film_name}</h3><FilmVersionIcon data= {{vd:rowData.film_version}}/>
                </div>
                <div className="dy_brief">评分：<span className="dy_mark">4.8</span></div>
                <div className="dy_brief">导演：{rowData.director}</div>
                <div className="dy_brief">主演：{rowData.actors}</div>
                <div className="dy_brief">时长：{rowData.film_long}分钟</div>
            </div>
            <div className="dy_btn_wrap"><PButton to={`/cinema/${rowData.film_id}/${encodeURI(rowData.film_name)}`} className="buy_btn">购票</PButton></div>
        </div>
    )
}

export default Film