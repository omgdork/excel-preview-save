import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import DataGrid from './data-grid';

describe('<DataGrid />', () => {
  it('should render correctly.', () => {
    const tree = renderer
      .create(<DataGrid />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render "No records." in a paragraph if no properties are set.', () => {
    const wrapper = shallow(<DataGrid />);
    expect(wrapper.html()).toEqual('<p>No records.</p>');
  });

  it('should render "some message" in a paragraph if the noDataMessage property is set to "some message".', () => {
    const wrapper = shallow(<DataGrid noDataMessage="some message" />);
    expect(wrapper.html()).toEqual('<p>some message</p>');
  });

  it('should render a table with headers and rows when an array of objects is set as the data property.', () => {
    const data = [
      { id: 1, name: 'John Doe', gender: 'Male' },
      { id: 2, name: 'Jane Doe', gender: 'Female' },
    ];
    const tree = renderer
      .create(<DataGrid data={data} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should trigger onSelect (if set) when a row is clicked.', () => {
    const data = [
      { id: 1, name: 'John Doe', gender: 'Male' },
      { id: 2, name: 'Jane Doe', gender: 'Female' },
    ];
    const onRowClick = jest.fn();
    const wrapper = mount(<DataGrid data={data} onSelect={onRowClick} />);

    wrapper.find('tbody tr').first().simulate('click');
    expect(onRowClick.mock.calls.length).toEqual(1);
  });
});
