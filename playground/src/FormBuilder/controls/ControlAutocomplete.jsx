import React from 'react'

import {
    Input,
    InputNumber,
    Tooltip,
    Form,
    Checkbox,
    AutoComplete
} from 'antd'

import EditFormHeader from "./EditFormHeader"
import FormItemLayout from "./FormItemLayout"

const FormItem = Form.Item;

const ControlAutocomplete = {
            key: "autocomplete",
            title: "Автозаполнение",
            create: () => ({
                      "type": "autocomplete",
                      "label": "Автозаполнение",
                      "className": "form-control",
                      "name": "autocomplete-1536599310930",
                      "values": [
                        {
                          "label": "Вариант 1"
                        },
                        {
                          "label": "Вариант 2"
                        },
                        {
                          "label": "Вариант 3"
                        }
                      ]
                    }),
            config: {
                generator: (props) => {
                    const {
                        values,
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
                        </span>)
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
                      value,
                      name,
                      values,
                      form
                    } = props;

                    const { getFieldDecorator } = form,
                          autoCompleteValues = values.map(v => v.label),
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
                      dataSource: autoCompleteValues
                    }

                    return (<Tooltip title={description} key={name}>
                              <FormItem {...formItemProps}>
                              {getFieldDecorator(label, {
                                initialValue:defaultValue
                                })(
                                <AutoComplete {...controlProps} />
                                )}
                              </FormItem>
                            </Tooltip>);
                }
            }
          };

export default ControlAutocomplete