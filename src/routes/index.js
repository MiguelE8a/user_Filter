import Home from '../component/Home'
import Details from '../component/Details'
import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const Routes = () => {
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/Details" component={Details} />

      </Switch>
    </BrowserRouter>

  )

}

export default Routes