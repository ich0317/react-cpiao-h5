//订单状态
export const ORDER_STATUS = {
    Unpaid: 100, //待支付
    Paid: 200, //已支付
    Refunded: 300, //已退款
    Refunding: 400, //退款中
    RefundFailed: 500, //退款失败
    Closed: 600 //已关闭（未支付成功）
};
//本地存贮的名字
export const storageName = {
    USER_ACTIVE_CITY:'_piaoUserCity',   //用户选择的城市
    USER_ACTIVE_POS:'_piaoUserPos',  //系统定位的城市
    USER_CITY_SESSIONS:'_piaoSessions', //缓存用户所在城市排期
    USER_CITY_CINEMAS:'_piaoCinemas'    //缓存用户所在城市影院
}

