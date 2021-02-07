import * as React from 'react';
import {useState} from 'react';
import {Meta} from "@storybook/react";
import NestedSlider, {NestedSliderNode} from "./NestedSlider";
import helper from "./helper";

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
                let targetPath: string = null
                let allPaths: string[] = []
                let parentPaths: string[] = []
                let childPaths: string[] = []

                helper.walk(data, (node, nodePath)=> {

                    if(node.id === newNode.id) {
                        targetPath = nodePath
                    } else {
                        allPaths.push(nodePath)
                    }
                })

                for(let nodePath of allPaths) {

                    // parent
                    if(targetPath.indexOf(nodePath) > -1) {
                        parentPaths.push(nodePath)
                    }

                    // children
                    if(nodePath.startsWith(targetPath)) {
                        childPaths.push(nodePath)
                    }
                }

                helper.walk(data, (node, nodePath)=> {

                    if(nodePath === targetPath) {
                        Object.assign(node, newNode)
                    }

                    if(parentPaths.indexOf(nodePath) > -1) {
                        Object.assign(node, {
                            value: [
                                Math.min(newNode.value[0], node.value[0]),
                                Math.max(newNode.value[1], node.value[1]),
                            ]
                        })
                    }

                    if(childPaths.indexOf(nodePath) > -1) {
                        Object.assign(node, {
                            value: [
                                Math.max(newNode.value[0], node.value[0]),
                                Math.min(newNode.value[1], node.value[1]),
                            ]
                        })
                    }
                })

                setData({
                    ...data,
                })
            }}
        />
    )
}

export default {
    title: 'NestedSlider',
} as Meta
