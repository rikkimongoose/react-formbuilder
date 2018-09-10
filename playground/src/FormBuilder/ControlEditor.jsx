import React from 'react'

import PropTypes from 'prop-types'

import { Form, Button } from 'antd'

class ControlEditor extends React.Component {  
  render() {
    const {
        configGenerator,
        configProps,
        form,
        onOk,
        onCancel
    } = this.props;

    const {
      validateFields
    } = form;
    
    const handleOk = () => {
             validateFields((errors, values) => {
              if(!!errors){
                return;
              }
              onOk(values);
            })
          },
          handleCancel = onCancel;

    const configControls = configGenerator({...configProps, form});

    return (<Form>
        {configControls}
        <Button type="primary" onClick={handleOk}>Сохранить</Button>
        <Button onClick={handleCancel}>Отмена</Button>
    </Form>);
    }
}

export default Form.create()(ControlEditor);

ControlEditor.propTypes = {
  form: PropTypes.any.isRequired,
  configGenerator: PropTypes.func.isRequired,
  configProps: PropTypes.object.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}