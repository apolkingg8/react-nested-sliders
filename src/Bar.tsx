import React from "react";
import {observer} from "mobx-react";
import {computedFn} from "mobx-utils";
import {stylesheet} from "typestyle";
import {percent} from "csx";

export interface BarProps {

}

const useStyles = computedFn(() => (stylesheet({
    wrap: {
        width: percent(100),
        height: 32,
        backgroundColor: 'darkcyan',
        borderRadius: 16,
    },
})))

const Bar = (props: BarProps) => {
    let styles = useStyles()

    return (
        <div className={styles.wrap}>

        </div>
    )
}

export default observer(Bar)