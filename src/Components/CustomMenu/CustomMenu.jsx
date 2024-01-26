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
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    }
    return (
        <div>
            <div
            >
                <div style={{
                    width: 80,
                }}>
                    <Button
                        type="primary"
                        onClick={toggleCollapsed}
                        style={{
                            marginBottom: 8,
                            marginTop:8,

                        }}
                    >
                        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    </Button>
                </div>

                <Menu
                    style={{
                        height :'100vh',
                    }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={collapsed}
                    items={items}
                />
            </div>


        </div>
    );
};

export default CustomMenu;