import React, {FC, useState} from "react";
import {stylesheet} from "typestyle";
import {percent} from "csx";
import useMeasure from "react-use-measure";
import {animated, useSpring} from "react-spring";
import _ from "lodash";

export interface SliderProps {
    label: string
    value: [number, number]
    onChange: (newValue: [number, number])=> void
    trackWidth?: number
}

const sliderSize = 4
const dotSize = 8

const getStyles = _.memoize((props: SliderProps)=> (stylesheet({
    wrap: {
        display: "flex",
        alignItems: "center",
        width: percent(100),
        height: 64,
    },
    label: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        flexShrink: 0,
        width: 64,
        height: percent(100),
        paddingLeft: 16,
        paddingRight: 16,
    },
    trackWrap: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        flex: 1,
        height: percent(100),
        overflowX: "auto",
    },
    track: {
        "-webkit-user-drag": "none",
        position: "relative",
        width: props.trackWidth ?? 800,
        height: sliderSize,
        backgroundColor: 'grey',
        borderRadius: sliderSize / 2,
    },
    bar: {
        "-webkit-user-drag": "none",
        position: "absolute",
        height: percent(100),
        borderRadius: sliderSize / 2,
        cursor: "move",
    },
    dot: {
        "-webkit-user-drag": "none",
        position: "absolute",
        top: -sliderSize,
        width: dotSize,
        height: dotSize,
        borderWidth: sliderSize / 2,
        borderStyle: "solid",
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
    let styles = getStyles(props)
    let labelStyle = useSpring({
        color: (isHover[0] || isHover[1] || isDragging[0] || isDragging[1]) ? "darkcyan" : "black",
        fontWeight: (isDragging[0] || isDragging[1]) ? "bold" : "normal",
    })
    let barStyle = useSpring({
        backgroundColor: (isHover[0] || isHover[1] || isDragging[0] || isDragging[1]) ? "darkcyan" : "black",
        transform: `scaleY(${(isDragging[0] || isDragging[1]) ? 1.2 : 1})`,
    })
    let leftDotStyle = useSpring({
        borderColor: (isHover[0] || isDragging[0]) ? "darkcyan" : "black",
        transform: `scale(${isDragging[0] ? 1.5 : 1})`,
        backgroundColor: isDragging[0] ? "darkcyan" : "white",
    })
    let rightDotStyle = useSpring({
        borderColor: (isHover[1] || isDragging[1]) ? "darkcyan" : "black",
        transform: `scale(${isDragging[1] ? 1.5 : 1})`,
        backgroundColor: isDragging[1] ? "darkcyan" : "white",
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
            <div className={styles.trackWrap}>
                <div
                    ref={trackRef}
                    className={styles.track}
                >
                    <animated.div
                        draggable={false}
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
            </div>
        </animated.div>
    )
}

export default Slider