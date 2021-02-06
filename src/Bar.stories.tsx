import * as React from 'react';
import {Meta} from "@storybook/react";
import Bar from "./Bar";

export const Basic = ()=> (
    <Bar/>
)

export default {
    title: 'Bar',
    component: Bar,
} as Meta
