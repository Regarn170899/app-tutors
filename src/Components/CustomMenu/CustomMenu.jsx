import React, { useState } from 'react';
import {
    ContainerOutlined,
    DesktopOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import {Link} from "react-router-dom";
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem('Главная', '1', <Link to="/"><DesktopOutlined /></Link>),
    getItem('Информация', '2', <Link to="/about"><PieChartOutlined /></Link>),
    getItem('База знаний', '3',  <Link to="/"><ContainerOutlined /></Link>),
    ]
const CustomMenu = () => {

    return (
        <div>
            <div>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="horizontal"
                    theme="dark"
                    items={items}
                />
            </div>


        </div>
    );
};

export default CustomMenu;