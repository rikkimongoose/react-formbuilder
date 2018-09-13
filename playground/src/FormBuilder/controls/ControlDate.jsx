import React from 'react'

import {
    Input,
    InputNumber,
    Tooltip,
    Form,
    Checkbox,
    DatePicker
} from 'antd'

import EditFormHeader from "./EditFormHeader"
import FormItemLayout from "./FormItemLayout"

const FormItem = Form.Item;
const { TextArea } = Input;

const dateFormatForDisplay = 'DD.MM.YYYY';

const ControlDate = {
            key: "date",
            title: "Дата",
            create: () => {
                return  {
                    "type": "date",
                    "label": "Дата",
                    "className": "form-control",
                    "name": "textarea-1536598113435",
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
                                <DatePicker placeholder="Значение" />
                              )}
                              </FormItem>
                        </span>);
                }
            },
            view: {
                generator: (props, data) => {
                    const {
                      type,
                      label,
                      className,
                      description,
                      placeholder,
                      readonly,
                      value,
                      name,
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
                      format: dateFormatForDisplay
                    }

                    return (<Tooltip {...tooltipProps}>
                              <FormItem {...formItemProps}>
                            {getFieldDecorator(label, {
                              initialValue: defaultValue
                            })(<DatePicker {...controlProps} />)}
                            </FormItem>
                            </Tooltip>);
                }
            }
          };

export default ControlDate