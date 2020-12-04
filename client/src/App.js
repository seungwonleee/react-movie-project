import React from 'react';
import axios from 'axios';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth';
import MovieDetail from './components/views/MovieDetail/MovieDetail';
import FavoritePage from './components/views/FavoritePage/FavoritePage';

import NavBar from '../src/components/views/NavBar/NavBar';

const App = (props) => {

  const onClickHandler = (props) => {
    axios.get(`/api/users/logout`)
      .then(res => {
        if (res.data.success) {
          console.log('logout !!!')
          props.history.push('/login');
          // 로그아웃시 로컬스토리지 저장된 아이디 삭제
          window.localStorage.removeItem('userId');
        } else {
          alert('로그아웃 하는데 실패했습니다.')
        }
      });
  }

  return (
    <div>
      <Router>
        {/* 고정메뉴바 */}
        <NavBar />

        <Switch>
          {/* null 아무나 접근가능, true 회원만 접근가능, false 비회원만 접근가능  */}
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/movie/:movieId" component={Auth(MovieDetail, null)} />
          <Route exact path="/favorite" component={Auth(FavoritePage, true)} />
        </Switch>

      </Router>
    </div >
  );
}

export default App;

