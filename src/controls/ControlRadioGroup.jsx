import React from 'react'

import {
    Input,
    InputNumber,
    Tooltip,
    Form,
    Checkbox,
    Radio
} from 'antd'

import EditFormHeader from "./EditFormHeader"
import FormItemLayout from "./FormItemLayout"

const FormItem = Form.Item;
const { TextArea } = Input;
const RadioGroup = Radio.Group;

const ControlRadioGroup = {
            key: "radio-group",
            title: "Радиокнопки",
            create: () => {
                return  {
                    "type": "radio-group",
                    "label": "Радио",
                    "name": "textarea-1536598113435",
                    "values": [
                        {
                          "label": "Вариант 1",
                          "value": "option-1"
                        },
                        {
                          "label": "Вариант 2",
                          "value": "option-2"
                        },
                        {
                          "label": "Вариант 3",
                          "value": "option-3"
                        }
                      ]
                };
            },
            config: {
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
                        rows,
                        form
                    } = props;

                    const { getFieldDecorator } = form;

                    return (<span>
                            {EditFormHeader(props, form)}
                        </span>)
                }
            },
            view: {
                generator: (props, data) => {
                    const {
                        label,
                        description,
                        placeholder,
                        className,
                        name,
                        value,
                        readonly,
                        values,
                        form
                    } = props;

                    const { getFieldDecorator } = form,
                          defaultValue = data || value;

                    const radioVariants = values.map(v => <Radio value={v.value} key={v.value}>{v.label}</Radio>)

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
                            })(<RadioGroup {...controlProps}>{radioVariants}</RadioGroup>)}
                            </FormItem>
                            </Tooltip>);
                }
            }
          };

export default ControlRadioGroup