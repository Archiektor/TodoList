import React from 'react';
import {Meta} from '@storybook/react/types-6-0';
import AppWithRedux from '../App/AppWithRedux';
import {ReduxStoreProviderDecorator} from './ReduxStoreProviderDecorator';

export default {
    title: 'AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator],
} as Meta;

export const AddItemFormBaseExample = (props: any) => {
    return (
        <AppWithRedux/>
    )
}