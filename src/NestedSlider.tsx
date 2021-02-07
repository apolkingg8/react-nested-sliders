import React, {FC} from "react";
import {stylesheet} from "typestyle";
import Slider from "./Slider";
import {percent} from "csx";
import {animated, useSpring} from "react-spring";
import _ from "lodash";

export interface NestedSliderNode {
    id: string
    label: string
    value: [number, number]
    nodes: NestedSliderNode[]
    isCollapsed: boolean
}

export interface NestedSliderProps {
    data: NestedSliderNode
    onChange?: (node: NestedSliderNode)=> void
}

const useStyles = ()=> _.memoize(stylesheet)({
    wrap: {

    },
    row: {
        display: "flex",
        alignItems: "center",
    },
    childWrap: {

    },
    btn: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 48,
        height: percent(100),
        cursor: "pointer",
    }
})

const NestedSlider: FC<NestedSliderProps> = (props) => {
    let childWrapStyle = useSpring(props.data.isCollapsed ? {
        height: 0,
        opacity: 0,
    } : {
        height: props.data.nodes.length * 64,
        opacity: 1,
    })
    let styles = useStyles()

    return (
        <>
            <div className={styles.row}>
                <div
                    className={styles.btn}
                    onClick={()=> {
                        props.onChange({
                            ...props.data,
                            isCollapsed: !props.data.isCollapsed,
                        })
                    }}
                >
                    {props.data.isCollapsed ? `+` : `-`}
                </div>
                <Slider
                    key={props.data.id}
                    label={props.data.label}
                    value={props.data.value}
                    onChange={(newValue)=> {
                        props.onChange({
                            ...props.data,
                            value: newValue,
                        })
                    }}
                />
            </div>
            <animated.div
                className={styles.childWrap}
                style={childWrapStyle}
            >
                {props.data.nodes.map((data)=> {
                    return (
                        <NestedSlider
                            data={data}
                            onChange={props.onChange}
                        />
                    )
                })}
            </animated.div>
        </>
    )
}

export default NestedSlider