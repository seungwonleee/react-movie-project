import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth';
import MovieDetail from './components/views/MovieDetail/MovieDetail';

const App = (props) => {
  return (
    <div>
      <Router>
        <div>
          <Switch>
            {/* null 아무나 접근가능 false 비회원만 접근가능  */}
            <Route exact path="/" component={Auth(LandingPage, null)} />
            <Route exact path="/login" component={Auth(LoginPage, false)} />
            <Route exact path="/register" component={Auth(RegisterPage, false)} />
            <Route exact path="/movie/:movieId" component={Auth(MovieDetail, null)} />
          </Switch>
        </div>
      </Router>
    </div >
  );
}

export default App;

