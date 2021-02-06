import * as React from 'react';
import {Meta} from "@storybook/react";
import SliderNode from "./SliderNode";

export const Basic = ()=> {
    return (
        <SliderNode isCollapsed={false}>

        </SliderNode>
    )
}

export default {
    title: 'SliderNode',
} as Meta
