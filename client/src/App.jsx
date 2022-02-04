import React from "react";
import { Switch, Route } from "react-router-dom";
import { StripeProvider } from "react-stripe-elements";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Signup from "./pages/Signup";
import Host from "./pages/Host";
import House from "./pages/House";
import ManageHouse from "./pages/ManageHouse";
import BookingManage from "./pages/BookingManage";
import { STRIPE_API } from "./configs/dev";

function App() {
  return (
    <StripeProvider apiKey={STRIPE_API}>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/search/:town/houses" component={Search} />
          <Route path="/signup" component={Signup} />
          <ProtectedRoute path="/houses/host" component={Host} />
          <ProtectedRoute path="/houses/manage" component={ManageHouse} />
          <ProtectedRoute path="/bookings/manage" component={BookingManage} />
          <Route path="/houses/:id" component={House} />
        </Switch>
      </div>
    </StripeProvider>
  );
}

export default App;
