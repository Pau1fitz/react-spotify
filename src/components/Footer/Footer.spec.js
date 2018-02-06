import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

import Footer from './index';

describe('Footer', () => {
  describe('renders correctly', () => {
    it('Footer should render', () => {
      const wrapper = shallow(<Footer />);
    });
  });
});
