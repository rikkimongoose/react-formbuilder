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

const ControlText = {
            key: "text",
            title: "Поле",
            create: () => {
                return {
                    "type": "text",
                    "label": "Поле",
                    "className": "form-control",
                    "name": "text-1536592306613",
                    "subtype": "text"
                };
            },
            config: {
                generator: (props) => {
                    const {
                        value,
                        maxlength,
                        form
                    } = props;

                    const { getFieldDecorator } = form;

                    return (<span>
                            {EditFormHeader(props, form)}
                            <FormItem {...FormItemLayout} label="Значение">
                              {getFieldDecorator('value', {
                                initialValue: value
                              })(
                                <Input placeholder="Значение" />
                              )}
                              </FormItem>
                            <FormItem {...FormItemLayout} label="Макс. длина">
                              {getFieldDecorator('maxlength', {
                                initialValue: maxlength
                              })(
                                <InputNumber min={1} />,
                              )}
                              </FormItem>
                        </span>)
                },
                props: {}
            },
            view: {
                generator: (props, data) => {
                    const {
                        required,
                        label,
                        description,
                        placeholder,
                        className,
                        name,
                        value,
                        subtype,
                        maxlength,
                        readonly,
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
                      label
                    };

                    const controlProps = {
                      className,
                      placeholder,
                      disabled: readonly
                    };

                    return (<Tooltip {...tooltipProps}>
                              <FormItem {...formItemProps}>
                            {getFieldDecorator(label, {
                              initialValue:defaultValue
                            })(<Input {...controlProps} />)}
                            </FormItem>
                            </Tooltip>);                
                },
                props: {}
            }
          };

export default ControlText