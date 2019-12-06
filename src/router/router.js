import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from '../views/home/home'
import CityList from '../views/city/city'
import Find from '../views/find/find'
import FindDetail from '@/views/find/detail/detail.js'
import Cinema from '@/views/cinema/cinema.js'
import Film from '@/views/film/film.js'
import Seat from '@/views/seat/seat.js'

function Routes(){
    return (
        <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/city" component={CityList} />
              <Route path="/find/detail/:id" component={FindDetail} />
              <Route path="/find" component={Find} />
              <Route path="/cinema" component={Cinema} />
              <Route path="/film" component={Film} />
              <Route path="/seat" component={Seat} />
            </Switch>
      </BrowserRouter>
    )
}

export default Routes