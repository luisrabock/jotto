import React from 'react';
import Enzyme, {shallow} from 'enzyme';

import Congrats from '../congrats';
import { findByTestAttr } from '../../tests/testUtils';

const setup = (props={}) => {
    return shallow(<Congrats {...props}/>)
}

it('Renders without error', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'component-congrats');
    expect(component.length).toBe(1);
})

it('Renders no text when `Success` prop is false', () => {
    const wrapper = setup({success: false});
    const component = findByTestAttr(wrapper, 'component-congrats');
    expect(component.text()).toBe('');
})

it('Renders no empty congrats when `success` prop is true', () => {
    const wrapper = setup({success: true});
    const message = findByTestAttr(wrapper, 'congrats-message');
    expect(message.text().length).not.toBe(0);
})

