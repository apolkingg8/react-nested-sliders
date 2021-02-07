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

const getStyles = _.memoize(()=> (stylesheet({
    wrap: {

    },
    row: {
        display: "flex",
        alignItems: "center",
    },
    childrenWrap: {

    },
    collapseBtn: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 24,
        flexShrink: 0,
        height: percent(100),
        cursor: "pointer",
    }
})))

const NestedSlider: FC<NestedSliderProps> = (props) => {
    let childrenWrapStyle = useSpring(props.data.isCollapsed ? {
        opacity: 0,
    } : {
        opacity: 1,
    })

    let styles = getStyles()

    return (
        <>
            <div className={styles.row}>
                <div
                    className={styles.collapseBtn}
                    onClick={()=> {
                        props.onChange({
                            ...props.data,
                            isCollapsed: !props.data.isCollapsed,
                        })
                    }}
                >
                    {props.data.nodes.length > 0
                        ? props.data.isCollapsed ? `+` : `-`
                        : null}
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
                className={styles.childrenWrap}
                style={childrenWrapStyle}
            >
                {!props.data.isCollapsed ? props.data.nodes.map((data)=> {
                    return (
                        <NestedSlider
                            key={data.id}
                            data={data}
                            onChange={props.onChange}
                        />
                    )
                }) : null}
            </animated.div>
        </>
    )
}

export default NestedSlider