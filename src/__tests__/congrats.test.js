import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import checkPropTypes from 'check-prop-types';

import Congrats from '../Congrats';
import { findByTestAttr, checkProps } from '../../tests/testUtils';

const defaultProps = {success: true};
const setup = (props={}) => {
    const setupProps = {...defaultProps, ...props};
    return shallow(<Congrats {...setupProps}/>)
}

it('Renders without error', () => {
    const wrapper = setup({success: false});
    const component = findByTestAttr(wrapper, 'component-congrats');
    expect(component.length).toBe(1);
})

it('Renders no text when `Success` prop is false', () => {
    const wrapper = setup({success: false});
    console.log('wrapper..', wrapper);
    const component = findByTestAttr(wrapper, 'component-congrats');
    expect(component.text()).toBe('');
})

it('Renders no empty congrats when `success` prop is true', () => {
    const wrapper = setup({success: true});
    const message = findByTestAttr(wrapper, 'congrats-message');
    expect(message.text().length).not.toBe(0);
})

it('Does not throw a warning with expected props', () => {
    const expectedProps = {success: false};
    checkProps(Congrats, expectedProps);
})
