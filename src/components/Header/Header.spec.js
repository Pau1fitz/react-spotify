import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

import Header from './index';

describe('Header', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Header />);
  })

  it('Header should render', () => {
    expect(wrapper).to.have.length(1);
  });

  it('Header should render both TrackSearch and UserDetails', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.children()).to.have.length(2);
  });

});
