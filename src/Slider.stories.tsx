import * as React from 'react';
import {Meta} from "@storybook/react";
import Bar from "./Slider";

export const defaultProps = ()=> {
    return (
        <Bar/>
    )
}

export const withLabel = ()=> {
    return (
        <Bar
            label={`Foo`}
        />
    )
}

export const onChange = ()=> {
    return (
        <Bar
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
