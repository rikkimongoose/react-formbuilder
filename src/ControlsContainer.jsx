import React from 'react'

import PropTypes from 'prop-types'

import { Form } from 'antd'
import { DragDropContext } from 'react-beautiful-dnd'

import FormBuilderMode from './FormBuilderMode'
import ControlPreview from './ControlPreview'
import ControlEdit from './ControlEdit'

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
      const controlInfo = controlTypes.find(t => t.key === control.type);
      const controlData = {
        configGenerator: controlInfo.config.generator,
        configProps: controlInfo.config.props,
        controlPreviewGenerator: (controlInfo.preview && controlInfo.preview.generator) || controlInfo.view.generator,
        controlPreviewProps: (controlInfo.preview && controlInfo.preview.props) || controlInfo.view.props,
        controlData: controlsData[control.name],
        doCopy,
        doDelete,
        doUpdate,
        form
      };
      return {
        configGenerator: controlInfo.config.generator,
        configProps: controlInfo.config.props,
        controlPreviewGenerator: (controlInfo.preview && controlInfo.preview.generator) || controlInfo.view.generator,
        controlPreviewProps: control,
        controlData: controlsData[control.name],
        key: control.name,
        doCopy,
        doDelete,
        doUpdate,
        form
      }
    };

    const generateControlPreview = (controlProps) => <ControlPreview {...controlProps } />;
    const generateControlEdit = (controlProps) => <ControlEdit {...controlProps} />;
    const generateControl = (mode === FormBuilderMode.Edit) ? generateControlEdit : generateControlPreview;

    const onDragEnd = () => {
        // the only one that is required
    };

    const DragDropContextProps = {onDragEnd};

    const controlsView = controls.map(c => generateControl(controlToProps(c)));

    return (<DragDropContext {...DragDropContextProps}>{controlsView}</DragDropContext>);
  }
}

export default Form.create()(ControlsContainer);

ControlsContainer.propTypes = {
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