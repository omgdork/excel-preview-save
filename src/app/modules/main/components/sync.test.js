import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import Sync from './sync';

describe('<Sync />', () => {
  it('should render correctly.', () => {
    const tree = renderer
      .create(<Sync />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should display the Sync button if there is a connection.', () => {
    Object.defineProperty(navigator, 'onLine', {
      configurable: true,
      value: true,
    });

    const wrapper = mount(<Sync />);
    expect(wrapper.find('.btn-sync').exists()).toEqual(true);
  });

  it('should not display the Sync button if there is no connection.', () => {
    Object.defineProperty(navigator, 'onLine', {
      configurable: true,
      value: false,
    });

    const wrapper = mount(<Sync />);
    expect(wrapper.find('.btn-sync').exists()).toEqual(false);
  });

  it('should trigger onSync when the Sync button is clicked.', () => {
    Object.defineProperty(navigator, 'onLine', {
      configurable: true,
      value: true,
    });

    const onSync = jest.fn();
    const wrapper = mount(<Sync onSync={onSync} />);

    wrapper.find('.btn-sync').simulate('click');
    expect(onSync.mock.calls.length).toEqual(1);
  });
});
