import React, {FC} from "react";
import {stylesheet} from "typestyle";
import Slider from "./Slider";
import {percent} from "csx";

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

const useStyles = ()=> (stylesheet({
    wrap: {
        display: "flex",
        alignItems: "center",
    },
    btn: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 48,
        height: percent(100),
        cursor: "pointer",
    }
}))

const NestedSlider: FC<NestedSliderProps> = (props) => {
    let styles = useStyles()

    return (
        <>
            <div className={styles.wrap}>
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
            {props.data.nodes.map((data)=> {
                return (
                    <NestedSlider
                        data={data}
                        onChange={props.onChange}
                    />
                )
            })}
        </>
    )
}

export default NestedSlider