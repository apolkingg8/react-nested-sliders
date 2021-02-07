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

export const colors = ()=> {
    let [value, setValue] = useState<[number, number]>([0, 100])

    return (
        <>
            <Slider
                label={`red`}
                value={value}
                color={`#D32F2F`}
                onChange={(newValue)=> {
                    setValue(newValue)
                }}
            />
            <Slider
                label={`orange`}
                value={value}
                color={`#F57C00`}
                onChange={(newValue)=> {
                    setValue(newValue)
                }}
            />
            <Slider
                label={`yellow`}
                value={value}
                color={`#FBC02D`}
                onChange={(newValue)=> {
                    setValue(newValue)
                }}
            />
            <Slider
                label={`green`}
                value={value}
                color={`#388E3C`}
                onChange={(newValue)=> {
                    setValue(newValue)
                }}
            />
            <Slider
                label={`blue`}
                value={value}
                color={`#1976D2`}
                onChange={(newValue)=> {
                    setValue(newValue)
                }}
            />
            <Slider
                label={`indigo`}
                value={value}
                color={`#303F9F`}
                onChange={(newValue)=> {
                    setValue(newValue)
                }}
            />
            <Slider
                label={`purple`}
                value={value}
                color={`#512DA8`}
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
