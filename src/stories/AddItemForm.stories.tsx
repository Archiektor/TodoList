import React from 'react';
import AddItemForm from '../AddItemForm/AddItemForm';
import {Meta} from '@storybook/react/types-6-0';
import {action} from '@storybook/addon-actions';

export default {
    title: 'AddItemForm',
    component: AddItemForm,
} as Meta;

export const AddItemFormBaseExample = (props: any) => {
    return (
        <AddItemForm addItem={action('Clicked add item')}/>
    )
}


