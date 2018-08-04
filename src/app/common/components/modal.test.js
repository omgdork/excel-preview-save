import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, render, mount } from 'enzyme';
import Modal from './modal';

describe('<Modal />', () => {
  const props = {
    children: (<h1>Hello, World!</h1>),
    btnCancel: {
      text: 'Cancel',
      onClick: jest.fn(),
    },
  };
  
  it('should render modal and its children correctly.', () => {
    const tree = renderer
      .create(<Modal {...props} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should not be shown when isShown is not set.', () => {
    const wrapper = render(<Modal {...props} />);
    expect(wrapper.hasClass('shown')).toEqual(false);
  });

  it('should have "shown" CSS class when isShown is set to true.', () => {
    const newProps = {
      ...props,
      isShown: true,
    };
    const wrapper = render(<Modal {...newProps} />);
    expect(wrapper.hasClass('shown')).toEqual(true);
  });

  it('should change the title of the modal when the title property is set.', () => {
    const title = 'My Modal';
    const wrapper = shallow(<Modal title={title} {...props} />);

    expect(wrapper.find('h3').text()).toEqual(title);
  });

  it('should render a confirm button if the btnConfirm property is set.', () => {
    const newProps = {
      ...props,
      btnConfirm: {
        text: 'Confirm',
        onClick: jest.fn(),
      }
    };
    const tree = renderer
      .create(<Modal {...newProps} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should trigger the onClick of btnCancel when the cancel button is clicked.', () => {
    const wrapper = mount(<Modal {...props} />);

    wrapper.find('.btn-cancel').simulate('click');
    expect(props.btnCancel.onClick.mock.calls.length).toEqual(1);
  });

  it('should trigger the onClick of btnConfirm when the confirm button is clicked.', () => {
    const newProps = {
      ...props,
      btnConfirm: {
        text: 'Confirm',
        onClick: jest.fn(),
      },
    };
    const wrapper = mount(<Modal {...newProps} />);

    wrapper.find('.btn-confirm').simulate('click');
    expect(newProps.btnConfirm.onClick.mock.calls.length).toEqual(1);
  });
});
