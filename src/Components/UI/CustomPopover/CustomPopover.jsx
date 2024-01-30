import React, {useState} from 'react';
import {Popover} from "antd";

const CustomPopover = ({children,content}) => {
    const [open, setOpen] = useState(false);
    const hide = () => {
        setOpen(false);
    };
    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };

    return (
        <div>
            <Popover
                placement="right"
                content={content}
                trigger="click"
                open={open}
                onOpenChange={handleOpenChange}
            >
                {children}

            </Popover>
        </div>
    );
};

export default CustomPopover;