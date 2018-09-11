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

const ControlCheckBox = {
            key: "checkbox",
            title: "Флажок",
            create: () => {
                return  {
                    "type": "checkbox",
                    "label": "Text Area",
                    "className": "form-control",
                    "name": "textarea-1536598113435",
                    "subtype": "textarea"
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
                      label
                    };

                    const controlProps = {
                      className,
                      defaultValue
                    }

                    return (<Tooltip {...tooltipProps}>
                              <FormItem {...formItemProps}>
                            {getFieldDecorator(label, {
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