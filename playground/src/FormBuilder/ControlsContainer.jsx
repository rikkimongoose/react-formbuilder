import React from 'react'

import PropTypes from 'prop-types'

import { Form, Button } from 'antd'

import FormBuilderMode from './FormBuilderMode'
import ControlPreview from './ControlPreview'
import ControlEdit from './ControlEdit'

const defaultState = {}

class ControlsContainer extends React.Component {
  render() {
    const {
      doCopy,
      doDelete,
      doUpdate,
      form,
      controls = [],
      controlsData = {},
      controlTypes = {},
      mode
    } = this.props;

    const controlToProps = (control) => {
      const controlInfo = controlTypes[control.type];
      return {
        configGenerator: controlInfo.config.generator,
        configProps: controlInfo.config.props,
        controlPreviewGenerator: controlInfo.preview && controlInfo.preview.generator || controlInfo.view.generator,
        controlPreviewProps: controlInfo.preview && controlInfo.preview.props || controlInfo.view.props,
        controlData: controlsData[control.name],
        doCopy,
        doDelete,
        doUpdate,
        form
      }
    };

    const generateControlPreview = (controlProps) => <ControlPreview {...controlProps } />;
    const generateControlEdit = (controlProps) => <ControlEdit {...controlProps} />;
    const generateControl = (mode === FormBuilderMode.Edit) ? generateControlEdit : generateControlPreview;

    const controlsView = controls.map(c => generateControl(controlToProps(c)));

    return (<div>{controlsView}</div>);
  }
}

export default Form.create()(ControlsContainer);

ControlsContainer.PropTypes = {
  doCopy: PropTypes.func,
  doDelete: PropTypes.func,
  doUpdate: PropTypes.func,
  doMove: PropTypes.func,
  form: PropTypes.any.isRequired,
  controls: PropTypes.array.isRequired,
  controlTypes: PropTypes.array.isRequired, 
  controlsData: PropTypes.array,
  mode: PropTypes.any.isRequired
}