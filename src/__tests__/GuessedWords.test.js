import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, checkProps } from '../../tests/testUtils';
import GuessedWords from '../GuessedWords';

const defaultProps = {guessedWords: [{guessedWord: 'train', letterMatchCount: 3}]};

const setup = (props={}) => {
    const setupProps = {...defaultProps, ...props};
    return shallow(<GuessedWords {...setupProps} />)
}

it('Does not throw a Warning with expected props', () => {
    checkProps(GuessedWords, defaultProps);
})