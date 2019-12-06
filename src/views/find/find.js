import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './find.scss'
class Find extends Component {
    render(){
        return (
            <div className="find_page">
                <div className="find_block">
                    <div className="create_date">2019-10-12</div>
                    <div className="find_img"><Link to="/find/detail/1"><img src={require('@/assets/3.jpg')} alt=""/></Link></div>
                    <div className="find_title"><Link to="/find/detail/1">历经风霜，也要从容向前</Link></div>
                    <div className="find_brief">相信看完《地久天长》的观众，内心都不会太平静。电影讲述了一个结局完满却又无比沉重的故事，长达三个小时，但一点不沉闷。镜头和剪辑都很特别，画面也细腻，浓浓的年代韵味中不乏美感</div>
                    <div className="interact">
                        <div className="visited_info">
                            <span className="read">阅读：12600</span>
                            <span className="good">点赞：120</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Find