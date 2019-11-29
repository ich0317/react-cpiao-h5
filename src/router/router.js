import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from '../views/film/film'
import City from '../views/city/city'


function Routes(){
    return (
        <BrowserRouter>
        <Switch>
        <Route exact path="/city" component={City} />
          <Route  path="/" component={Home} />
          
        </Switch>
      </BrowserRouter>
    )
}

export default Routes