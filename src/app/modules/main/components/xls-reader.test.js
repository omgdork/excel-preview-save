import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import XLSReader from './xls-reader';

describe('<XLSReader />', () => {
  const onSave = jest.fn();
  const stubFileReader = {
    onLoad: jest.fn(),
    readAsArrayBuffer: jest.fn(),
  };

  window.FileReader = jest.fn(() => stubFileReader);

  it('should render correctly.', () => {
    const tree = renderer
      .create(<XLSReader onSave={onSave} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should read the selected file.', () => {
    const wrapper = mount(<XLSReader onSave={onSave} />);
    const file = new File([''], 'test.xls', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    wrapper.find('input').simulate('change', {
      target: {
        files: [file],
      },
    });

    expect(window.FileReader.mock.calls.length).toEqual(1);
  });

  it('should display the entries in the modal\'s grid when a file is read.', () => {
    const wrapper = mount(<XLSReader onSave={onSave} />);

    wrapper.setState({
      filename: 'test.xlsx',
      entries: [
        { id: 1, name: 'John Doe', gender: 'Male' },
        { id: 2, name: 'Jane Doe', gender: 'Female' },
      ],
      isPreview: true,
    });

    expect(wrapper.find('.modal').hasClass('shown')).toEqual(true);
    expect(wrapper.find('tbody tr').length).toEqual(2);
  });

  it('should clear the entries in the modal if file selection is cancelled.', () => {
    const wrapper = mount(<XLSReader onSave={onSave} />);

    wrapper.setState({
      entries: [
        { id: 1, name: 'John Doe', gender: 'Male' },
        { id: 2, name: 'Jane Doe', gender: 'Female' },
      ],
    });

    wrapper.find('input').simulate('change', {
      target: {
        files: [],
      },
    });

    expect(wrapper.state('entries').length).toEqual(0);
  });

  it('should trigger a function when the save button is clicked.', () => {
    const wrapper = mount(<XLSReader onSave={onSave} />);

    wrapper.setState({
      filename: 'test.xls',
      entries: [
        { id: 1, name: 'John Doe', gender: 'Male' },
        { id: 2, name: 'Jane Doe', gender: 'Female' },
      ],
      isPreview: true,
    });

    wrapper.find('.btn-confirm').simulate('click');
    expect(onSave.mock.calls.length).toEqual(1);
  });

  it('should close the modal when the cancel button is clicked.', () => {
    const wrapper = mount(<XLSReader onSave={onSave} />);

    wrapper.setState({
      filename: 'test.xls',
      entries: [
        { id: 1, name: 'John Doe', gender: 'Male' },
        { id: 2, name: 'Jane Doe', gender: 'Female' },
      ],
      isPreview: true,
    });

    wrapper.find('.btn-cancel').simulate('click');
    expect(wrapper.state('filename')).toEqual('');
    expect(wrapper.state('entries').length).toEqual(0);
    expect(wrapper.state('isPreview')).toEqual(false);
  });
});
