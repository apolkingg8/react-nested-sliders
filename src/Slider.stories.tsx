import * as React from 'react';
import {useState} from 'react';
import {Meta} from "@storybook/react";
import Slider from "./Slider";

export const basic = ()=> {
    return (
        <Slider
            label={`Foo`}
            value={[0, 100]}
            onChange={(newValue)=> {

            }}
        />
    )
}

export const withControl = ()=> {
    let [value, setValue] = useState<[number, number]>([0, 100])
    return (
        <Slider
            label={`Foo`}
            value={value}
            onChange={(newValue)=> {
                setValue(newValue)
            }}
        />
    )
}

export default {
    title: 'Slider',
} as Meta
