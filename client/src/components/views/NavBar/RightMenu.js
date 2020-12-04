import React from 'react';
import { Menu, Grid } from 'antd';
import { Link } from "react-router-dom";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const { useBreakpoint } = Grid;

const RightMenu = () => {

    const { md } = useBreakpoint();

    return (
        <Menu mode={md ? "horizontal" : "inline"}>
            <Menu.Item key="signUp">
                <a href="">회원가입</a>
            </Menu.Item>
            <Menu.Item key="signIn">
                <a href="">로그인</a>
            </Menu.Item>
        </Menu>
    );
}

export default RightMenu;