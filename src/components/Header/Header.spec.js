import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

import Header from './index';

describe('Header', () => {
  describe('renders correctly', () => {
    it('Header should render', () => {
      const wrapper = shallow(<Header />);
    });
  });
});
