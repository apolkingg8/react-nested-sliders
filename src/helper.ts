import {NestedSliderNode} from "./NestedSlider";
import _ from "lodash";

class Helper {

    walk = (
        node: NestedSliderNode,
        callback: (node: NestedSliderNode, nodePath: string)=> void,
        path: string = ``
    )=> {
        let nodePath = `${path}____${node.id}`

        callback(node, nodePath)

        for(let _node of node.nodes) {
            this.walk(_node, callback, nodePath)
        }
    }

    handleNewNode = (data: NestedSliderNode, newNode: NestedSliderNode)=> {
        let newData = _.cloneDeep(data)
        let targetPath: string = null
        let allPaths: string[] = []
        let parentPaths: string[] = []
        let childPaths: string[] = []

        this.walk(newData, (node, nodePath)=> {

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

        this.walk(newData, (node, nodePath)=> {

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

        return newData
    }
}

export default new Helper()