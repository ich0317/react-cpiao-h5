import './index.scss'
const gear = '<?xml version="1.0" encoding="utf-8"?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="70px" height="70px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style="margin-right:-2px;display:block;background-repeat-y:initial;background-repeat-x:initial;animation-play-state:paused" ><g transform="translate(50 50)" style="transform:matrix(1, 0, 0, 1, 50, 50);animation-play-state:paused" ><g transform="matrix(1,0,0,1,0,0)" style="transform:matrix(1, 0, 0, 1, 0, 0);animation-play-state:paused" ><path d="M29.491524206117255 -5.5 L37.491524206117255 -5.5 L37.491524206117255 5.5 L29.491524206117255 5.5 A30 30 0 0 1 24.742744050198738 16.964569457146712 L24.742744050198738 16.964569457146712 L30.399598299691117 22.621423706639092 L22.621423706639096 30.399598299691114 L16.964569457146716 24.742744050198734 A30 30 0 0 1 5.5 29.491524206117255 L5.5 29.491524206117255 L5.5 37.491524206117255 L-5.499999999999997 37.491524206117255 L-5.499999999999997 29.491524206117255 A30 30 0 0 1 -16.964569457146705 24.742744050198738 L-16.964569457146705 24.742744050198738 L-22.621423706639085 30.399598299691117 L-30.399598299691117 22.621423706639092 L-24.742744050198738 16.964569457146712 A30 30 0 0 1 -29.491524206117255 5.500000000000009 L-29.491524206117255 5.500000000000009 L-37.491524206117255 5.50000000000001 L-37.491524206117255 -5.500000000000001 L-29.491524206117255 -5.500000000000002 A30 30 0 0 1 -24.742744050198738 -16.964569457146705 L-24.742744050198738 -16.964569457146705 L-30.399598299691117 -22.621423706639085 L-22.621423706639092 -30.399598299691117 L-16.964569457146712 -24.742744050198738 A30 30 0 0 1 -5.500000000000011 -29.491524206117255 L-5.500000000000011 -29.491524206117255 L-5.500000000000012 -37.491524206117255 L5.499999999999998 -37.491524206117255 L5.5 -29.491524206117255 A30 30 0 0 1 16.964569457146702 -24.74274405019874 L16.964569457146702 -24.74274405019874 L22.62142370663908 -30.39959829969112 L30.399598299691117 -22.6214237066391 L24.742744050198738 -16.964569457146716 A30 30 0 0 1 29.491524206117255 -5.500000000000013 M0 -20A20 20 0 1 0 0 20 A20 20 0 1 0 0 -20" fill="#ff6969" style="animation-play-state:paused" ></path></g></g><!-- generated by https://loading.io/ --></svg>';
export const PageLoading = {
    show(msg){
        const oBody = document.querySelectorAll('body')[0];
        oBody.insertAdjacentHTML('beforeend', `<div class="dy_page_loading">\
            <div class="dy_text_wrap">\
                <dl class="dy_page_text">\
                    <dt></dt>\
                    <dd>\
                        <p></p>\
                        <p></p>\
                        <p></p>\
                    </dd>\
                </dl>\
                
                <dl class="dy_page_text">\
                    <dt></dt>\
                    <dd>\
                        <p></p>\
                        <p></p>\
                        <p></p>\
                    </dd>\
                </dl>\
                <dl class="dy_page_text">\
                    <dd>\
                        <p></p>\
                        <p></p>\
                        <p></p>\
                    </dd>\
                </dl>\
                <dl class="dy_page_text">\
                    <dt></dt>\
                    <dd>\
                        <p></p>\
                        <p></p>\
                        <p></p>\
                    </dd>\
                </dl>\
            </div>\
            <div class="dy_loading_wrap">\
                <div class="dy_loading_center">\
                    <div class="dy_revolve_animation">${gear}</div>\
                    <p>${msg || '快速加载中...'}</p>\
                </div>\
            </div>\
        </div>`);
    },
    hide(){
        const oPageLoading= document.querySelectorAll('.dy_page_loading')[0];
        oPageLoading.remove();
    }
}

