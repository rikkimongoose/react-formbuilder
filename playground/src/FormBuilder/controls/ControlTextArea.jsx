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

const ControlTextArea = {
            key: "textarea",
            title: "Текст",
            create: () => {
                return  {
                    "type": "textarea",
                    "label": "Текст",
                    "className": "form-control",
                    "name": "textarea-1536598113435",
                    "subtype": "textarea",
                    "rows": 3
                };
            },
            config: {
                generator: (props) => {
                    const {
                        value,
                        maxlength,
                        rows,
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
                                <InputNumber min={0} />,
                              )}
                              </FormItem>
                            <FormItem {...FormItemLayout} label="Строки">
                              {getFieldDecorator('rows', {
                                initialValue: rows
                              })(
                                <InputNumber min={0} />,
                              )}
                              </FormItem>
                        </span>)
                }
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
                        rows,
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
                      disabled: readonly,
                      defaultValue,
                      rows
                    };

                    return (<Tooltip {...tooltipProps}>
                              <FormItem {...formItemProps}>
                            {getFieldDecorator(label, {
                              initialValue:defaultValue
                            })(<TextArea {...controlProps} />)}
                            </FormItem>
                            </Tooltip>);
                }
            }
          };

export default ControlTextArea