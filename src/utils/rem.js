;(function () {
    let docEl = document.documentElement;
    let dprArr = [1, 2, 3];
    function setRem(){
      docEl.style.fontSize = docEl.clientWidth * 20 / 375 + 'px';
      docEl.dataset.dpr = dprArr.includes(window.devicePixelRatio) ? window.devicePixelRatio : 1;
    }
    
    setRem();
    
    window.addEventListener('resize', setRem);
})()
