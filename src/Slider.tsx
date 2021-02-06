import React, {useState} from "react";
import {observer} from "mobx-react";
import {computedFn} from "mobx-utils";
import {stylesheet} from "typestyle";
import {percent} from "csx";
import useMeasure from "react-use-measure";

export interface BarProps {
    label?: string
    onChange?: (delayMs: number, durationMs: number)=> void
}

const useStyles = computedFn(() => (stylesheet({
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
        backgroundColor: 'darkcyan',
        borderRadius: 4,
    },
    draggable: {
        "-webkit-user-drag": "none",
        position: "absolute",
        top: -6,
        width: 16,
        height: 16,
        backgroundColor: 'lightcyan',
        border: `2px solid darkcyan`,
        borderRadius: percent(50),
        cursor: "move",
    },
})))

const Slider = (props: BarProps) => {
    let [isDragging, setIsDragging] = useState([false, false])
    let [value, setValue] = useState([0, 100])
    let [trackRef, trackBounds] = useMeasure()
    let trackWidth = trackBounds.width - 32
    let leftPosition = trackWidth * value[0] / 100
    let rightPosition = trackWidth * (100 - value[1]) / 100
    let styles = useStyles()

    return (
        <div
            className={styles.wrap}
            onMouseUp={()=> {
                setIsDragging([false, false])
            }}
            onMouseLeave={()=> {
                setIsDragging([false, false])
            }}
            onMouseMove={(event)=> {

                if((!isDragging[0] && !isDragging[1])
                || !event.clientX || event.clientX <= 0) {
                    return
                }

                if(isDragging[0]) {
                    let mX = event.clientX - 8 - trackBounds.x
                    setValue([mX / trackWidth * 100, value[1]])
                }

                if(isDragging[1]) {
                    let mX = event.clientX - 16 - 8 - trackBounds.x
                    setValue([value[0], mX / trackWidth * 100])
                }
            }}
        >
            {props.label &&
            <div className={styles.label}>
                {props.label}
            </div>}
            <div
                ref={trackRef}
                className={styles.track}
            >
                <div
                    className={styles.bar}
                    style={{
                        left: leftPosition,
                        right: rightPosition,
                    }}
                />
                <div
                    draggable={false}
                    className={styles.draggable}
                    style={{
                        left: leftPosition,
                    }}
                    onMouseDown={()=> {
                        setIsDragging([true, false])
                    }}
                />
                <div
                    draggable={false}
                    className={styles.draggable}
                    style={{
                        right: rightPosition,
                    }}
                    onMouseDown={()=> {
                        setIsDragging([false, true])
                    }}
                />
            </div>
        </div>
    )
}

export default observer(Slider)