import React from 'react';
import renderer from 'react-test-renderer';
import { render } from 'enzyme';
import OnlineStatus from './online-status';

describe('<OnlineStatus />', () => {
  it('should render correctly.', () => {
    const tree = renderer
      .create(<OnlineStatus />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should display "Online" if there is a connection.', () => {
    Object.defineProperty(navigator, 'onLine', {
      configurable: true,
      value: true,
    });
    
    const wrapper = render(<OnlineStatus />);
    expect(wrapper.html()).toEqual('Online');
  });

  it('should display "Offline" if there is no connection.', () => {
    Object.defineProperty(navigator, 'onLine', {
      configurable: true,
      value: false,
    });

    const wrapper = render(<OnlineStatus />);
    expect(wrapper.html()).toEqual('Offline');
  });
});
