import helper from "./helper";
import {NestedSliderNode} from "./NestedSlider";

describe("helper", ()=> {

    test("walk() single", ()=> {
        let data: NestedSliderNode = {
            id: `1`,
            label: `1`,
            value: [0, 100],
            isCollapsed: true,
            nodes: [],
        }

        let ids = []

        helper.walk(data, (node, nodePath)=> {
            ids.push(node.id)
        })

        expect(ids).toMatchObject(['1'])
    })

    test("walk() nested", ()=> {
        let data: NestedSliderNode = {
            id: `1`,
            label: `1`,
            value: [0, 100],
            isCollapsed: true,
            nodes: [{
                id: `1-1`,
                label: `1-1`,
                value: [0, 100],
                isCollapsed: false,
                nodes: []
            }, {
                id: `1-2`,
                label: `1-2`,
                value: [0, 100],
                isCollapsed: false,
                nodes: [{
                    id: `1-2-1`,
                    label: `1-2-1`,
                    value: [0, 100],
                    isCollapsed: false,
                    nodes: []
                }]
            }, {
                id: `1-3`,
                label: `1-3`,
                value: [0, 100],
                isCollapsed: false,
                nodes: []
            }],
        }

        let ids = []

        helper.walk(data, (node, nodePath)=> {
            ids.push(node.id)
        })

        expect(ids).toMatchObject(['1', '1-1', '1-2', '1-2-1', '1-3'])
    })
})