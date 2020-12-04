import React from 'react';
import { Menu, Grid } from 'antd';
import { Link } from "react-router-dom";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const { useBreakpoint } = Grid;

const LeftMenu = () => {

    const { md } = useBreakpoint();

    return (
        <Menu mode={md ? "horizontal" : "inline"} style={{ borderBottom: 'none' }}>

            <SubMenu key="movie" title="Movie">
                <Menu.Item key="setting:1">인기</Menu.Item>
                <Menu.Item key="setting:2">현재 상영 중</Menu.Item>
                <Menu.Item key="setting:3">개봉 예정</Menu.Item>
                <Menu.Item key="setting:4">높은 평점</Menu.Item>
            </SubMenu>

            <SubMenu key="TVProgram" title="TV 프로그램">
                <Menu.Item key="setting:1">인기</Menu.Item>
                <Menu.Item key="setting:2">오늘 방영</Menu.Item>
                <Menu.Item key="setting:3">TV 방영 중</Menu.Item>
                <Menu.Item key="setting:4">높은 평점</Menu.Item>
            </SubMenu>

            <Menu.Item key="인물">
                인물
            </Menu.Item>

            <Menu.Item key="자유게시판">
                자유게시판
            </Menu.Item>

        </Menu>


    );
}

export default LeftMenu;
{/* <div style={{ background: 'black', height: '100%' }}>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/favorite'>좋아요 목록</Link></li>
            <li><Link to='/login'>로그인</Link></li>
            <li><Link to='/register'>회원가입</Link></li>
            <li><Link to='/logout' onClick={onClickHandler}>로그아웃</Link></li>
          </ul>
        </div> */}