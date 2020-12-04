<<<<<<< HEAD
import React, { useState } from 'react';
import { Drawer, Button } from 'antd';

import LeftMenu from './LeftMenu';
import RightMenu from './RightMenu';
import './NavBar.css';

import { Link } from "react-router-dom";

const Navbar = () => {

    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false)
    };


    return (
        <nav className="menuBar">

            <div className="logo">
                <Link to='/'><a>OV</a></Link>
                <div>Overseas Video</div>
            </div>

            <div className="menuCon">
                <div className="leftMenu"><LeftMenu /></div>
                <div className="rightMenu"><RightMenu /></div>

                <Button className="barsMenu" type="primary" onClick={showDrawer}>
                    <span className="barsBtn"></span>
                </Button>

                <Drawer
                    title="Menu"
                    placement="right"
                    closable={false}
                    onClose={onClose}
                    visible={visible}
                >
                    <LeftMenu />
                    <RightMenu />
                </Drawer>

            </div>
        </nav>
    );

}

export default Navbar;
=======
import React from 'react'

function NavBar() {
    return (
        <div>
            NavBar
        </div>
    )
}

export default NavBar
>>>>>>> 14eb53f9cb5b4e25d3928e2d054b0bfa27c51498
