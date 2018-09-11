import React from 'react'

import {
    Input,
    InputNumber,
    Tooltip,
    Form,
    Checkbox,
    Select
} from 'antd'

import FormItemLayout from "./FormItemLayout"

const FormItem = Form.Item;
const { TextArea } = Input;

const Option = Select.Option;

const ControlSelect = {
            key: "select",
            title: "Выбор",
            create: () => {
                return  {
                    "type": "select",
                    "label": "Выбор",
                    "name": "select-1536598113435",
                    "values": [
                        {
                          "label": "Option 1",
                          "value": "option-1"
                        },
                        {
                          "label": "Option 2",
                          "value": "option-2"
                        },
                        {
                          "label": "Option 3",
                          "value": "option-3"
                        }
                      ]
                };
            },
            config: {
                generator: (props) => {
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

                            <FormItem {...FormItemLayout} label="Подпись">
                              {getFieldDecorator('label', {
                              })(
                                <Input placeholder="Подпись" />
                              )}
                              </FormItem>

                            <FormItem {...FormItemLayout} label="Подсказка">
                              {getFieldDecorator('label', {
                              })(
                                <Input placeholder="Всплывающая подсказка" />
                              )}
                              </FormItem>

                            <FormItem {...FormItemLayout} label="Текст внутри">
                              {getFieldDecorator('placeholder', {
                              })(
                                <Input placeholder="Текст внутри" />
                              )}
                              </FormItem>

                            <FormItem {...FormItemLayout} label="Класс CSS">
                              {getFieldDecorator('className', {
                              })(
                                <Input placeholder="Класс CSS" />
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

                            <FormItem {...FormItemLayout} label="Макс. длина">
                              {getFieldDecorator('maxlength', {
                              })(
                                <InputNumber min={0} />,
                              )}
                              </FormItem>
                            <FormItem {...FormItemLayout} label="Строки">
                              {getFieldDecorator('rows', {
                              })(
                                <InputNumber min={0} />,
                              )}
                              </FormItem>
                        </span>)
                },
                props: {}
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

                    const selectVariants = values.map(v => <Option value={v.value}>{v.label}</Option>)

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
                            })(<Select {...controlProps}>{selectVariants}</Select>)}
                            </FormItem>
                            </Tooltip>);
                  },
                props: {}
            }
          };

export default ControlSelect