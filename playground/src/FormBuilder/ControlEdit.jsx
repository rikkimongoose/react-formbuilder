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
            controlPreviewGenerator,
            controlPreviewProps = {},
            controlData,
            doCopy,
            doDelete,
            doUpdate,
            form
        } = this.props;

        const {
            controlPropsCurrent = controlPreviewProps
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

        const controlView = controlPreviewGenerator({ ...controlPropsCurrent, form }, controlData);

        return (<div>
            <Button icon="copy" onClick={() => { doCopy && doCopy(controlPreviewProps) }} />
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

ControlEdit.propTypes = {
    configGenerator: PropTypes.func.isRequired,
    configProps: PropTypes.object.isRequired,
    controlPreviewGenerator: PropTypes.func.isRequired,
    controlPreviewProps: PropTypes.object,
    controlData: PropTypes.object,
    doCopy: PropTypes.func,
    doDelete: PropTypes.func,
    doUpdate: PropTypes.func,
    form: PropTypes.any
}