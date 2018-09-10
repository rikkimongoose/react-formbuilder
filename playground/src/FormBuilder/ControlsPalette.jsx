import React from 'react'

import PropTypes from 'prop-types'

import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu,
      MenuItem = Menu.Item;

class ControlsPalette extends React.Component {
  render() {
    const {
      controlTypes,
      doAdd
    } = this.props;

    const generateControlType = (controlType) => <MenuItem key={controlType.key} onClick={() => doAdd(controlType)}>{controlType.title}</MenuItem>;

    const generateControlTypeGroup = (controlTypeGroup) => (
      <SubMenu key={controlTypeGroup.key} title={<span><Icon type={controlTypeGroup.icon} /><span>{controlTypeGroup.title}</span></span>}>
        {controlTypeGroup.types.map(c => generateControlType(c))}
      </SubMenu>);

    const controlTypesGroupsView = controlTypes.map(c => generateControlTypeGroup(c));

    return (<Menu
        mode="inline"
        style={{ width: 256 }}
      >{controlTypesGroupsView}</Menu>);
  }
}

export default ControlsPalette;

ControlsPalette.PropTypes = {
  controlTypes: PropTypes.array.isRequired,
  doAdd: PropTypes.func
}