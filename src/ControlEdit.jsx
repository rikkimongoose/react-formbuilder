import React from 'react'

import PropTypes from 'prop-types'

import ControlEditor from './ControlEditor'

import { Button, Collapse } from 'antd'

const Panel = Collapse.Panel;

class ControlEdit extends React.Component {
    state = {}

    updateControlPropsCurrent(controlPropsCurrent) {
        this.setState({controlPropsCurrent});
    }

    render() {
        const {
          configGenerator,
          configProps,
          controlGenerator,
          controlProps = {},
          form
        } = this.props;

        const {
            controlPropsCurrent = controlProps
        } = this.state;

        const {
            updateControlPropsCurrent
        } = this;

        const onOk = (data) => {
            doUpdate && doUpdate(data);
            updateControlPropsCurrent(data);
        }

        const onCancel = () => {}

        const controlEditorProps = {
                configGenerator,
                configProps,
                onOk,
                onCancel
            };

        const controlView = controlGenerator(controlPropsCurrent, controlData);

        return (<div>
            <Button icon="copy" onClick={() => { doCopy && doCopy(controlProps) }} />
            <Button icon="delete" onClick={() => { doDelete && doDelete() }}/>
            {controlView}
            <Collapse defaultActiveKey={[]}>
                <Panel header="Редактировать">
                  <ControlEditor {...controlEditorProps} />
                </Panel>
            </Collapse>
        </div>);
        }
    }

export default ControlEdit;

ControlEdit.PropTypes = {
    configGenerator: PropTypes.func.isRequired,
    configProps: PropTypes.object.isRequired,
    controlGenerator: PropTypes.func.isRequired,
    controlProps: PropTypes.object,
    controlData: PropTypes.object,
    doCopy: PropTypes.func,
    doDelete: PropTypes.func,
    doUpdate: PropTypes.func,
    form: PropTypes.any
}