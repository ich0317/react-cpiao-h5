import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "../views/home/home";
import CityList from "../views/city/city";
import Find from "../views/find/find";
import FindDetail from "@/views/find/detail/detail.js";
import Cinema from "@/views/cinema/cinema.js";
import Film from "@/views/film/film.js";
import Seat from "@/views/seat/seat.js";
import OrderDetail from "@/views/order/detail/detail.js";
import OrderList from "@/views/order/list.js";
import Login from "@/views/login.js";


function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/home/:city" component={Home} />
                <Route path="/home" component={Home} />
                <Route path="/city" component={CityList} />
                <Route path="/find/detail/:id" component={FindDetail} />
                <Route path="/find" component={Find} />
                <Route path="/cinema/:film_id/:film_name" component={Cinema} />
                <Route path="/film/:cinema_id/:film_id" component={Film} />
                <Route path="/seat/:session_id/:screen_id" component={Seat} />
                <Route path="/order-list" component={OrderList} />
                <Route path="/order/detail/:order_id" component={OrderDetail} />
                <Route path="/login" component={Login} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
