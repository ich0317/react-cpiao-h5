import React, {Component} from "react";
import './index.scss'

export class MPDrag extends Component {

    componentDidMount(){
        this.oDrag = document.querySelector('.dy_drag');
        this.tx =0;
        this.ty = 45;
        this.scale = 1;
    }

    touchDown(e){
        e.persist()
        this.oldScale = this.scale;
        this.getSclae = (e) => {
            let x1=e.targetTouches[0].pageX;
            let y1=e.targetTouches[0].pageY;
        
            let x2=e.targetTouches[1].pageX;
            let y2=e.targetTouches[1].pageY;
            var a=x1-x2;
            var b=y1-y2;

            return Math.sqrt(a**2+b**2)
        }

        if(e.targetTouches.length === 2){
            this.down = this.getSclae(e);
        }else{
            this.disX=e.targetTouches[0].pageX-this.tx;
            this.disY=e.targetTouches[0].pageY-this.ty;
        }
        e.preventDefault();
        return false;
    }

    touchMove(e){
        e.persist()
        if(e.targetTouches.length === 2){
            this.scale = this.getSclae(e) / this.down + this.oldScale;
        }else{
            this.tx=e.targetTouches[0].pageX-this.disX;
            this.ty=e.targetTouches[0].pageY-this.disY;
            this.oDrag.style.WebkitTransform='translate3d('+this.tx+'px,'+this.ty+'px,0)';
            this.oDrag.style.transform='translate3d('+this.tx+'px,'+this.ty+'px,0)';

            this.props.dragMove(this.tx, this.ty)
        }
    }

    touchEnd(){
        document.removeEventListener('touchend',this.touchMove, false)
        document.removeEventListener('touchend',this.touchEnd, false)
    }

    render(){
        return(
            <div className="dy_drag" style={{transform: 'translate3d(0, 45px, 0px)'}} onTouchStart = {this.touchDown.bind(this)} onTouchMove = {this.touchMove.bind(this)} onTouchEnd = {this.touchEnd.bind(this)}>{this.props.children}</div>
        )
    }
}
