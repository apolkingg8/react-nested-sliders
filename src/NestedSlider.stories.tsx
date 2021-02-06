import * as React from 'react';
import {useState} from 'react';
import {Meta} from "@storybook/react";
import NestedSlider, {NestedSliderNode} from "./NestedSlider";

const replaceNode = (root: NestedSliderNode, newNode: NestedSliderNode)=> {

    if(root.id === newNode.id) {
        return newNode
    } else {
        root.nodes = root.nodes.map((_node)=> {
            return replaceNode(_node, newNode)
        })
    }

    return root
}

export const basic = ()=> {
    let [data, setData] = useState<NestedSliderNode>({
        id: `1`,
        label: `Foo`,
        value: [0, 100],
        isCollapsed: true,
        nodes: [{
            id: `1-1`,
            label: `Foo-1`,
            value: [0, 100],
            isCollapsed: false,
            nodes: []
        }, {
            id: `1-2`,
            label: `Foo-2`,
            value: [0, 100],
            isCollapsed: false,
            nodes: [{
                id: `1-2-1`,
                label: `Foo-2-1`,
                value: [0, 100],
                isCollapsed: false,
                nodes: []
            }]
        }],
    })

    return (
        <NestedSlider
            data={data}
            onChange={(newNode)=> {
                let newData = replaceNode(data, newNode)
                setData({
                    ...newData
                })
            }}
        />
    )
}

export default {
    title: 'NestedSlider',
} as Meta
