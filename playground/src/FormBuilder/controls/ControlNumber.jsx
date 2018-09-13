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

const ControlNumber = {
            key: "number",
            title: "Число",
            create: () => {
                return  {
                    "type": "number",
                    "label": "Число",
                    "className": "form-control",
                    "name": "number-1536598113435",
                    "step": 1
                };
            },
            config: {
                generator: (props) => {
                    const {
                        min,
                        max,
                        step,
                        rows,
                        form
                    } = props;

                    const valueProps = {
                        min,
                        max,
                        step
                    };

                    const { getFieldDecorator } = form;

                    return (<span>
                            {EditFormHeader(props, form)}
                            <FormItem {...FormItemLayout} label="Значение">
                              {getFieldDecorator('value', {
                                initialValue: value
                              })(
                                <InputNumber {...valueProps} placeholder="Значение" />
                              )}
                              </FormItem>
                            <FormItem {...FormItemLayout} label="Макс.">
                              {getFieldDecorator('max', {
                                initialValue: max
                              })(
                                <InputNumber placeholder="Максимальное значение" />,
                              )}
                              </FormItem>
                            <FormItem {...FormItemLayout} label="Мин.">
                              {getFieldDecorator('min', {
                                initialValue: min
                              })(
                                <InputNumber placeholder="Минимальное значение" />,
                              )}
                              </FormItem>
                            <FormItem {...FormItemLayout} label="Шаг">
                              {getFieldDecorator('step', {
                                initialValue: step
                              })(
                                <InputNumber placeholder="Шаг" min={0} />,
                              )}
                              </FormItem>
                        </span>)
                }
            },
            view: {
                generator: (props, data) => {
                    const {
                        label,
                        description,
                        className,
                        name,
                        value,
                        min,
                        max,
                        step,
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
                        min,
                        max,
                        step
                    };

                    return (<Tooltip {...tooltipProps}>
                              <FormItem {...formItemProps}>
                            {getFieldDecorator(label, {
                              initialValue: defaultValue
                            })(<InputNumber {...controlProps} />,
                            )}
                            </FormItem>
                            </Tooltip>);
                }
            }
          };

export default ControlNumber