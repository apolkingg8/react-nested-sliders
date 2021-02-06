import React from "react"

export interface DndProps {
    text: string
}

const Dnd = (props: DndProps)=> {
    return (
        <div>
            {props.text}
        </div>
    )
}

export default Dnd