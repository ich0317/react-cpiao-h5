import React from 'react'
import { Button } from 'antd-mobile'
import "./index.scss"

const Film = (rowData) => {
    return (
        <div className="dy_pro_list">
            <img src = {rowData.photo} alt="1" className="dy_film_photo" />
            <div className="dy_content">
                <div className="dy_title">
                    <h3 className="dy_show_name">{rowData.filmName}</h3><span className="dy_vd">{rowData.vd}</span>
                </div>
                <div className="dy_brief">评分：<span className="dy_mark">{rowData.mark}</span></div>
                <div className="dy_brief">导演：{rowData.director}</div>
                <div className="dy_brief">主演：{rowData.actors}</div>
                <div className="dy_brief">时长：{rowData.long}分钟</div>
            </div>
            <div className="dy_btn_wrap"><Button type="warning" inline size="small">购票</Button></div>
        </div>
    )
}

export default Film