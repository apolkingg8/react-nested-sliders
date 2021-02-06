import * as React from 'react';
import {Meta} from "@storybook/react";
import SliderNode from "./SliderNode";
import Slider from "./Slider";

export const defaultProps = ()=> {
    return (
        <SliderNode isCollapsed={false}>
            <Slider/>
            <Slider/>
            <Slider/>
        </SliderNode>
    )
}

export default {
    title: 'SliderNode',
} as Meta
