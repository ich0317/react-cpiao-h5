import React from 'react'
import { FilmVersionIcon } from '@/components/FilmVersion/index.js'
import { PButton } from "@/components/Elements/index"
import "./index.scss"

const Film = (rowData) => {
    console.log(rowData.data);
    return (
        rowData.data.map(v=><div className="dy_pro_list" key={v.film_id}>
            <img src = {v.film_photo} alt="1" className="dy_film_photo" />
            <div className="dy_content">
                <div className="dy_title">
                    <h3 className="dy_show_name">{v.film_name}</h3><FilmVersionIcon data= {{vd:v.film_version}}/>
                </div>
                <div className="dy_brief">评分：<span className="dy_mark">4.8</span></div>
                <div className="dy_brief">导演：{v.director}</div>
                <div className="dy_brief">主演：{v.actors}</div>
                <div className="dy_brief">时长：{v.film_long}分钟</div>
            </div>
            <div className="dy_btn_wrap"><PButton to={`/cinema/${v.film_id}/${encodeURI(v.film_name)}`} className="buy_btn">购票</PButton></div>
        </div>)
    )
}

export default Film