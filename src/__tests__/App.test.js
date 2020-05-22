import React from 'react';
import Enzyme, {shallow} from 'enzyme';

import App from '../App';


it('renders learn react link', () => {
  const wrapper = shallow(<App />);
  expect(wrapper).toBeTruthy();
});
