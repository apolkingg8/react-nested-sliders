import * as React from 'react';
import Dnd from './Dnd';
import {Meta} from "@storybook/react";

export const Foo = ()=> (
    <Dnd text={`Foo`}/>
)

export const Bar = ()=> (
    <Dnd text={`Bar`}/>
)

export default {
    title: 'Dnd',
    component: Dnd,
} as Meta
