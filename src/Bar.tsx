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

const Bar = (props: BarProps) => {
    let [isDraggingLeft, setIsDraggingLeft] = useState(false)
    let [isDraggingRight, setIsDraggingRight] = useState(false)
    let [left, setLeft] = useState(0)
    let [right, setRight] = useState(100)
    let [trackRef, trackBounds] = useMeasure()
    let trackWidth = trackBounds.width - 32
    let styles = useStyles()

    return (
        <div
            className={styles.wrap}
            onMouseUp={()=> {
                setIsDraggingLeft(false)
                setIsDraggingRight(false)
            }}
            onMouseLeave={()=> {
                setIsDraggingLeft(false)
                setIsDraggingRight(false)
            }}
            onMouseMove={(event)=> {

                if((!isDraggingLeft && !isDraggingRight)
                    || !event.clientX || event.clientX <= 0) {
                    return
                }

                if(isDraggingLeft) {
                    let mX = event.clientX - 8 - trackBounds.x
                    setLeft(mX / trackWidth * 100)
                }

                if(isDraggingRight) {
                    let mX = event.clientX - 16 - 8 - trackBounds.x
                    setRight(mX / trackWidth * 100)
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
                    className={styles.draggable}
                    style={{
                        left: trackWidth * left / 100,
                    }}
                    draggable={false}
                    onMouseDown={()=> {
                        setIsDraggingLeft(true)
                    }}
                />
                <div
                    className={styles.draggable}
                    style={{
                        left: trackWidth * right / 100 + 16,
                    }}
                    draggable={false}
                    onMouseDown={()=> {
                        setIsDraggingRight(true)
                    }}
                />
            </div>
        </div>
    )
}

export default observer(Bar)