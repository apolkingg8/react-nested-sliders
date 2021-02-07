import React, {FC, useState} from "react";
import {stylesheet} from "typestyle";
import {percent} from "csx";
import useMeasure from "react-use-measure";
import {animated, useSpring} from "react-spring";
import _ from "lodash";

export interface SliderProps {
    label: string
    value: [number, number]
    onChange?: (newValue: [number, number])=> void
}

const useStyles = _.memoize(()=> (stylesheet({
    wrap: {
        display: "flex",
        alignItems: "center",
        width: percent(100),
        height: 64,
    },
    label: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: percent(100),
        paddingLeft: 16,
        paddingRight: 16,
    },
    track: {
        position: "relative",
        flex: 1,
        height: 8,
        backgroundColor: 'grey',
        borderRadius: 4,
    },
    bar: {
        position: "absolute",
        height: percent(100),
        borderRadius: 4,
        cursor: "move",
    },
    dot: {
        "-webkit-user-drag": "none",
        position: "absolute",
        top: -6,
        width: 16,
        height: 16,
        backgroundColor: '#fff',
        border: `2px solid darkcyan`,
        borderRadius: percent(50),
        cursor: "move",
    },
})))

const Slider: FC<SliderProps> = (props) => {
    let [isHover, setIsHover] = useState<[boolean, boolean]>([false, false])
    let [isDragging, setIsDragging] = useState<[boolean, boolean]>([false, false])
    let [trackRef, trackBounds] = useMeasure()
    let trackWidth = trackBounds.width - 32
    let leftPosition = trackWidth * props.value[0] / 100
    let rightPosition = trackWidth * (100 - props.value[1]) / 100
    let styles = useStyles()
    let labelStyle = useSpring({
        color: (isHover[0] || isHover[1]) ? "darkcyan" : "black",
        scale: (isDragging[0] || isDragging[1]) ? 1.2 : 1,
    })
    let barStyle = useSpring({
        backgroundColor: (isHover[0] && isHover[1]) ? "darkcyan" : "black",
        scaleY: (isDragging[0] && isDragging[1]) ? 1.2 : 1,
    })
    let leftDotStyle = useSpring({
        borderColor: isHover[0] ? "darkcyan" : "black",
        scale: isDragging[0] ? 1.2 : 1,
    })
    let rightDotStyle = useSpring({
        borderColor: isHover[1] ? "darkcyan" : "black",
        scale: isDragging[1] ? 1.2 : 1,
    })

    return (
        <animated.div
            className={styles.wrap}
            onMouseUp={()=> {
                setIsDragging([false, false])
            }}
            onMouseLeave={()=> {
                setIsDragging([false, false])
            }}
            onMouseMove={(event)=> {

                if(!event.clientX || event.clientX <= 0
                || !(isDragging[0] || isDragging[1])) {
                    return
                }

                let dx = (event.movementX / trackWidth) * 100
                let newValue: [number, number] = [
                    Math.max(0, props.value[0] + (isDragging[0] ? dx : 0)),
                    Math.min(100, props.value[1] + (isDragging[1] ? dx : 0)),
                ]

                props.onChange && props.onChange(newValue)
            }}
        >
            <animated.div
                className={styles.label}
                style={labelStyle}
            >
                {props.label}
            </animated.div>
            <div
                ref={trackRef}
                className={styles.track}
            >
                <animated.div
                    className={styles.bar}
                    style={{
                        ...barStyle,
                        left: leftPosition,
                        right: rightPosition,
                    }}
                    onMouseEnter={()=> {
                        setIsHover([true, true])
                    }}
                    onMouseLeave={()=> {
                        setIsHover([false, false])
                    }}
                    onMouseDown={()=> {
                        setIsDragging([true, true])
                    }}
                />
                <animated.div
                    draggable={false}
                    className={styles.dot}
                    style={{
                        ...leftDotStyle,
                        left: leftPosition,
                    }}
                    onMouseEnter={()=> {
                        setIsHover([true, false])
                    }}
                    onMouseLeave={()=> {
                        setIsHover([false, false])
                    }}
                    onMouseDown={()=> {
                        setIsDragging([true, false])
                    }}
                />
                <animated.div
                    draggable={false}
                    className={styles.dot}
                    style={{
                        ...rightDotStyle,
                        right: rightPosition,
                    }}
                    onMouseEnter={()=> {
                        setIsHover([false, true])
                    }}
                    onMouseLeave={()=> {
                        setIsHover([false, false])
                    }}
                    onMouseDown={()=> {
                        setIsDragging([false, true])
                    }}
                />
            </div>
        </animated.div>
    )
}

export default Slider