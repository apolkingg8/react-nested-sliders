import * as React from 'react';
import {Meta} from "@storybook/react";
import Bar from "./Bar";

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
            onChange={(delayMs, durationMs)=> {

            }}
        />
    )
}

export default {
    title: 'Bar',
} as Meta
