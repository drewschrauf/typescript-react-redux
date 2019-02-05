import React from 'react';
import { mount } from 'enzyme';
import { selectorForTestHook } from '@/testHook';

import About from '../About';

jest.mock('../../../README.md', () => '<h1>Content</h1>');

const CONTENT_SELECTOR = selectorForTestHook('content', 'div');

describe('About', () => {
  it('should match snapshot', () => {
    const root = mount(<About />);
    expect(root.html()).toMatchSnapshot();
  });
  it('should render README content as markup', () => {
    const root = mount(<About />);
    expect(root.find(CONTENT_SELECTOR).prop('dangerouslySetInnerHTML')).toEqual({
      __html: '<h1>Content</h1>',
    });
  });
});
