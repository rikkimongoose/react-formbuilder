import React from 'react'

import {
    Input,
    InputNumber,
    Tooltip,
    Form,
    Checkbox
} from 'antd'

import EditFormHeader from "./EditFormHeader"

import FormItemLayout from "./FormItemLayout"

const FormItem = Form.Item;
const { TextArea } = Input;

const ControlCheckBox = {
            key: "checkbox",
            title: "Флажок",
            create: () => {
                return  {
                    "type": "checkbox",
                    "label": "Флажок",
                    "className": "form-control",
                    "name": "textarea-1536598113435",
                    "subtype": "textarea"
                };
            },
            config: {
                generator: (props) => {
                    const {
                      value,
                      form
                    } = props;

                    const { getFieldDecorator } = form;

                    return (<span>
                            {EditFormHeader(props, form)}
                            <FormItem {...FormItemLayout} label="Значение">
                              {getFieldDecorator('value', {
                                initialValue: value
                              })(
                                <Checkbox placeholder="Значение" />
                              )}
                              </FormItem>
                        </span>)
                },
                props: {}
            },
            view: {
                generator: (props, data) => {
                    const {
                      type,
                      label,
                      className,
                      description,
                      value,
                      name,
                      readonly = false,
                      form
                    } = props;

                    const { getFieldDecorator } = form,
                          defaultValue = data || value;

                    const tooltipProps = {
                      title: description,
                      key: name
                    };

                    const formItemProps = {
                      ...FormItemLayout,
                      label: ""
                    };

                    const controlProps = {
                      className
                    }

                    return (<Tooltip {...tooltipProps}>
                              <FormItem {...formItemProps}>
                            {getFieldDecorator(label, {
                              initialValue:defaultValue
                            })(
                              <Checkbox {...controlProps}>{label}</Checkbox>
                            )}
                            </FormItem>
                            </Tooltip>);
                },
                props: {}
            }
          };

export default ControlCheckBox