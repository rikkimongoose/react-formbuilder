import React from 'react'

import {
    Input,
    InputNumber,
    Tooltip,
    Form,
    Checkbox,
    AutoComplete
} from 'antd'

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
                          "label": "Option 1"
                        },
                        {
                          "label": "Option 2"
                        },
                        {
                          "label": "Option 3"
                        }
                      ]
                    }),
            config: {
                generator: (props) => {
                    const {
                        required,
                        label,
                        placeholder,
                        description,
                        className,
                        name,
                        value,
                        values,
                        form
                    } = props;

                    const { getFieldDecorator } = form;

                    return (<span>
                            <FormItem {...FormItemLayout} label="Обязательный">
                              {getFieldDecorator('required', {
                              })(
                                <Checkbox />
                              )}
                              </FormItem>
                            <FormItem {...FormItemLayout} label="Название">
                              {getFieldDecorator('label', {
                              })(
                                <Input placeholder="Название" />
                              )}
                              </FormItem>

                            <FormItem {...FormItemLayout} label="Подсказка">
                              {getFieldDecorator('placeholder', {
                              })(
                                <Input placeholder="Подсказка" />
                              )}
                              </FormItem>

                            <FormItem {...FormItemLayout} label="Всплывающая подсказка">
                              {getFieldDecorator('description', {
                              })(
                                <Input placeholder="Всплывающая подсказка" />
                              )}
                              </FormItem>

                            <FormItem {...FormItemLayout} label="CSS класс">
                              {getFieldDecorator('className', {
                              })(
                                <Input placeholder="CSS класс" />
                              )}
                              </FormItem>

                            <FormItem {...FormItemLayout} label="Название">
                              {getFieldDecorator('name', {
                              })(
                                <Input placeholder="Название" />
                              )}
                              </FormItem>

                            <FormItem {...FormItemLayout} label="Значение">
                              {getFieldDecorator('value', {
                              })(
                                <Input placeholder="Значение" />
                              )}
                              </FormItem>
                        </span>)
                },
                props: {}
            },
            view: {
                generator: (props, data) => {
                    debugger;
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
                      defaultValue,
                      dataSource: autoCompleteValues
                    }

                    return (<Tooltip title={description} key={name}>
                              <FormItem {...formItemProps}>
                              {getFieldDecorator(label, {
                                })(
                                <AutoComplete {...controlProps} />
                                )}
                              </FormItem>
                            </Tooltip>);
                },
                props: {}
            }
          };

export default ControlAutocomplete