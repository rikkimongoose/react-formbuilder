import React from 'react'

import PropTypes from 'prop-types'

import FormBuilderMode from './FormBuilderMode'
import ControlsPalette from './ControlsPalette'
import ControlsContainer from './ControlsContainer'
import FormBuilderTypes from './FormBuilderTypes'

import { Row, Col, Layout } from 'antd'

import generateUUID from './controls/generateUUID'

const { Sider, Content } = Layout;

const moveInArray = (arr, pos1, pos2) => {
  // local variables
  let i, tmp;
  // cast input parameters to integers
  pos1 = parseInt(pos1, 10);
  pos2 = parseInt(pos2, 10);
  // if positions are different and inside array
  if (pos1 !== pos2 && 0 <= pos1 && pos1 <= arr.length && 0 <= pos2 && pos2 <= arr.length) {
    // save element from position 1
    tmp = arr[pos1];
    // move element down and shift other elements up
    if (pos1 < pos2) {
      for (i = pos1; i < pos2; i++) {
        arr[i] = arr[i + 1];
      }
    }
    // move element up and shift other elements down
    else {
      for (i = pos1; i > pos2; i--) {
        arr[i] = arr[i - 1];
      }
    }
    // put element from position 1 to destination
    arr[pos2] = tmp;
  }
}

const controlTypesToFlatList = (controlTypes) => controlTypes
      .map(c => c.types)
      .reduce((a, b) => a.concat(b), []);

class FormBuilder extends React.Component {
  state = {
    controlsCurrent: []
  }

  render() {
    const { controlsCurrent } = this.state;
    const {
      controlTypes = FormBuilderTypes,
      controls = controlsCurrent,
      controlsData = [],
      mode = FormBuilderMode.Edit
    } = this.props;

    const doAdd = (controlType) => {
      const {controlsCurrent} = this.state;
      const control = controlType.create()
      controlsCurrent.push( { ...control, name: generateUUID() });
      this.setState({controlsCurrent});
    };

    const doCopy = (control) => {
      const {controlsCurrent} = this.state;
      const newControl = { ...control, name: generateUUID() }
      controlsCurrent.push(newControl);
      this.setState({controlsCurrent});
    };

    const doDelete = (control) => {
      const {controlsCurrent} = this.state;
      const controlsNew = controlsCurrent.filter(c => c.name !== control.name);
      this.setState({controlsCurrent: controlsNew});
    };

    const doUpdate = (control) => {
      const {controlsCurrent} = this.state;
      const baseControl = controlsCurrent.find(c => c.name === control.name) || null;
      if(baseControl){
        const controlIndex = controlsCurrent.indexOf(baseControl);
        controlsCurrent[controlIndex] = control;
      } else {
        controlsCurrent.push(control);
      }
      this.setState({controlsCurrent});
    };

    const doMove = (control, index) => {
      const {controlsCurrent} = this.state;
      const baseControl = controlsCurrent.find(c => c.name === control.name) || null;
      if(!baseControl) {
        controlsCurrent.splice(index, 0, control);
      } else { 
        const indexOld = controlsCurrent.indexOf(baseControl);
        if(indexOld === index){
          return;
        }
        moveInArray(controlsCurrent, indexOld, index)
      }
      this.setState({controlsCurrent});
    }

    const controlTypesFlat = controlTypesToFlatList(controlTypes);

    const controlsPaletteProps = {
      controlTypes,
      doAdd
    };

    const controlsContainerProps = {
      controlTypes: controlTypesFlat,
      doCopy,
      doDelete,
      doUpdate,
      doMove,
      controls,
      controlsData,
      mode
    };

    const paletteView = (mode === FormBuilderMode.Edit) ? (<ControlsPalette {...controlsPaletteProps} />) : (<span />)

    return (<Row>
      <Col span={12}>{paletteView}</Col>
      <Col span={12}><ControlsContainer {...controlsContainerProps} /></Col>
    </Row>);
  }
}

export default FormBuilder;

FormBuilder.propTypes = {
  controlTypes:  PropTypes.array,
  controls: PropTypes.array,
  controlsData: PropTypes.array,
  mode: PropTypes.any
}