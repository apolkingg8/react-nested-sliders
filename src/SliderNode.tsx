import React, {FC} from "react";
import {observer} from "mobx-react";
import {computedFn} from "mobx-utils";
import {stylesheet} from "typestyle";
import {animated, useSpring} from "react-spring";

export interface SliderNodeProps {
    isCollapsed: boolean
}

const useStyles = computedFn(() => (stylesheet({
    wrap: {

    },
})))

const SliderNode: FC<SliderNodeProps> = (props) => {
    let styles = useStyles()
    let wrapStyle = useSpring({

    })

    return (
        <animated.div
            className={styles.wrap}
            style={wrapStyle}
        >
            {props.children}
        </animated.div>
    )
}

export default observer(SliderNode)