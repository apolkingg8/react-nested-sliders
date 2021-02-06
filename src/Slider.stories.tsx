import * as React from 'react';
import {Meta} from "@storybook/react";
import Slider from "./Slider";

export const defaultProps = ()=> {
    return (
        <Slider/>
    )
}

export const withLabel = ()=> {
    return (
        <Slider
            label={`Foo`}
        />
    )
}

export const onChange = ()=> {
    return (
        <Slider
            label={`Check console`}
            onChange={(value)=> {
                console.log(value)
            }}
        />
    )
}

export default {
    title: 'Slider',
} as Meta
