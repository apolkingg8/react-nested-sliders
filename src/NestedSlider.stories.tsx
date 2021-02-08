import * as React from 'react';
import {useState} from 'react';
import {Meta} from "@storybook/react";
import NestedSlider, {NestedSliderNode} from "./NestedSlider";
import helper from "./helper";

export const basic = ()=> {
    let [data, setData] = useState<NestedSliderNode>({
        id: `1`,
        label: `1`,
        value: [0, 100],
        isCollapsed: true,
        color: `#AD1457`,
        nodes: [{
            id: `1-1`,
            label: `1-1`,
            value: [0, 100],
            isCollapsed: false,
            color: `#EC407A`,
            nodes: [],
        }, {
            id: `1-2`,
            label: `1-2`,
            value: [0, 100],
            isCollapsed: false,
            color: `#EC407A`,
            nodes: [],
        }],
    })

    return (
        <NestedSlider
            data={data}
            onChange={(newNode)=> {
                setData(helper.handleNewNode(data, newNode))
            }}
        />
    )
}

export const nested = ()=> {
    let [data, setData] = useState<NestedSliderNode>({
        id: `1`,
        label: `1`,
        value: [0, 100],
        isCollapsed: true,
        color: `#388E3C`,
        nodes: [{
            id: `1-1`,
            label: `1-1`,
            value: [0, 100],
            isCollapsed: false,
            color: `#689F38`,
            nodes: [],
        }, {
            id: `1-2`,
            label: `1-2`,
            value: [0, 100],
            isCollapsed: true,
            color: `#689F38`,
            nodes: [{
                id: `1-2-1`,
                label: `1-2-1`,
                value: [0, 100],
                isCollapsed: false,
                color: `#AFB42B`,
                nodes: [],
            }, {
                id: `1-2-2`,
                label: `1-2-2`,
                value: [0, 100],
                isCollapsed: false,
                color: `#AFB42B`,
                nodes: [],
            }]
        }, {
            id: `1-3`,
            label: `1-3`,
            value: [0, 100],
            isCollapsed: true,
            color: `#689F38`,
            nodes: [{
                id: `1-3-1`,
                label: `1-3-1`,
                value: [0, 100],
                isCollapsed: false,
                color: `#AFB42B`,
                nodes: [],
            }]
        }],
    })

    return (
        <NestedSlider
            data={data}
            onChange={(newNode)=> {
                setData(helper.handleNewNode(data, newNode))
            }}
        />
    )
}

export const multipleNested = ()=> {
    let [data, setData] = useState<NestedSliderNode>({
        id: `1`,
        label: `1`,
        value: [0, 100],
        isCollapsed: true,
        color: `#D32F2F`,
        nodes: [{
            id: `1-1`,
            label: `1-1`,
            value: [0, 100],
            isCollapsed: false,
            color: `#D32F2F`,
            nodes: []
        }, {
            id: `1-2`,
            label: `1-2`,
            value: [0, 100],
            isCollapsed: false,
            color: `#F57C00`,
            nodes: [{
                id: `1-2-1`,
                label: `1-2-1`,
                value: [0, 100],
                isCollapsed: false,
                color: `#FBC02D`,
                nodes: []
            }, {
                id: `1-2-2`,
                label: `1-2-2`,
                value: [0, 100],
                isCollapsed: false,
                color: `#FBC02D`,
                nodes: []
            }]
        }],
    })
    let [data2, setData2] = useState<NestedSliderNode>({
        id: `2`,
        label: `2`,
        value: [0, 100],
        isCollapsed: true,
        color: `#1976D2`,
        nodes: [{
            id: `2-1`,
            label: `2-1`,
            value: [0, 100],
            isCollapsed: false,
            color: `#303F9F`,
            nodes: [],
        }, {
            id: `2-2`,
            label: `2-2`,
            value: [0, 100],
            isCollapsed: false,
            color: `#303F9F`,
            nodes: [{
                id: `2-2-1`,
                label: `2-2-1`,
                value: [0, 100],
                isCollapsed: false,
                color: `#512DA8`,
                nodes: [],
            }]
        }],
    })

    return (
        <>
            <NestedSlider
                data={data}
                onChange={(newNode)=> {
                    setData(helper.handleNewNode(data, newNode))
                }}
            />
            <NestedSlider
                data={data2}
                onChange={(newNode)=> {
                    setData2(helper.handleNewNode(data2, newNode))
                }}
            />
        </>
    )
}

export default {
    title: 'NestedSlider',
} as Meta
