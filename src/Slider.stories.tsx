import * as React from 'react';
import {useState} from 'react';
import {Meta} from "@storybook/react";
import Slider from "./Slider";

export const basic = ()=> {
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

export const trackWidth = ()=> {
    let [value, setValue] = useState<[number, number]>([0, 100])

    return (
        <>
            <Slider
                label={`200`}
                value={value}
                trackWidth={200}
                onChange={(newValue)=> {
                    setValue(newValue)
                }}
            />
            <Slider
                label={`300`}
                value={value}
                trackWidth={300}
                onChange={(newValue)=> {
                    setValue(newValue)
                }}
            />
            <Slider
                label={`400`}
                value={value}
                trackWidth={400}
                onChange={(newValue)=> {
                    setValue(newValue)
                }}
            />
        </>
    )
}

export default {
    title: 'Slider',
} as Meta
