import {NestedSliderNode} from "./NestedSlider";

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

    replaceNode = (root: NestedSliderNode, newNode: NestedSliderNode)=> {

        if(root.id === newNode.id) {
            return newNode
        } else {
            root.nodes = root.nodes.map((_node)=> {
                let _newNode = this.replaceNode(_node, newNode)

                if(_newNode.value[0] < root.value[0]) {
                    root.value[0] = _newNode.value[0]
                }

                if(_newNode.value[1] > root.value[1]) {
                    root.value[1] = _newNode.value[1]
                }

                return _newNode
            })
        }

        return root
    }
}

export default new Helper()