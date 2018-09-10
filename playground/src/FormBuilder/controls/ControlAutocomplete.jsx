import React from 'react'

import {
    Input,
    InputNumber,
    Tooltip,
    Form,
    Checkbox
} from 'antd'

import FormItemLayout from "./FormItemLayout"

const FormItem = Form.Item;
const { TextArea } = Input;

const ControlAutocomplete = {
            key: "autocomplete",
            title: "Автозаполнение",
            create: () => {
                return {
                      "type": "autocomplete",
                      "label": "Autocomplete",
                      "className": "form-control",
                      "name": "autocomplete-1536599310930",
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
                generator: (props, form) => {
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
                        rows
                    } = props;
                    return (<Tooltip title={description}><TextArea rows={rows} key={name} className={className} placeholder={placeholder} defaultValue={value} /></Tooltip>);
                },
                props: {}
            }
          };

export default ControlAutocomplete