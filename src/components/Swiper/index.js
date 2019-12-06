import React, { Component } from 'react'
import './index.scss'

export class Swiper extends Component {

  constructor(props){
    super(props)
    this.state = {
      imgIndex:0
    }
  }

  componentDidMount(){
    let curX = 7.5;
    let upX = 0;
    let oImg = document.querySelector('.imgs');
    let oBox = document.querySelector('.swipe-slide');
    this.props.swiperChangeIndex(this.state.imgIndex)
    oImg.addEventListener('touchstart', (ev)=>{
        let downX = ev.changedTouches[0].pageX / 20;
        let disX = downX - curX;
        oImg.style.WebkitTransition = "none";
        
        const fnMove = (ev)=>{
            curX = (ev.changedTouches[0].pageX / 20 - disX).toFixed(2);
            oImg.style.WebkitTransform = "translate3d(" + curX + "rem, 0, 0)";
        }
        const fnEnd = (ev)=>{
            let upX = ev.changedTouches[0].pageX / 20;
            let iNow = Math.round((curX - 7.5)/3.75);
            if(iNow > 0) iNow = 0;
            if(iNow < -(this.props.data.length - 1))iNow = -(this.props.data.length - 1);
            curX = 7.5 + 3.75 * iNow;
            oImg.style.WebkitTransform = "translate3d(" + curX + "rem, 0, 0)";

            this.setState({
              imgIndex:Math.abs(iNow)
            })
   
            oBox.removeEventListener("touchmove", fnMove, false);
            oBox.removeEventListener("touchend", fnEnd, false);
            oImg.style.WebkitTransition = ".3s all ease";

            this.props.swiperChangeIndex(this.state.imgIndex)
        }
        oBox.addEventListener('touchmove', fnMove, false);
        oBox.addEventListener('touchend', fnEnd, false);
    }, false);
  }

  render(){
    return (
      <div id="swiper">
        <div className="swipe-wrap">
            <div className="swipe-slide">
              <ul className="imgs clearfix" style={{WebkitTransform:'translate3d(7.5rem,0,0)'}}>
              {
                this.props.data.map((v, i)=><li key={i} className={ i === this.state.imgIndex ? 'active' : ''}><img src={v.img} alt={v.img} /></li>)
              }
              </ul>
              <b className="center-mark"></b>
            </div>
        </div>
    </div>
    )
  }
}

