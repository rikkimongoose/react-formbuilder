import React from 'react'

import {
    Input,
    InputNumber,
    Tooltip,
    Form,
    Checkbox
} from 'antd'

import FormItemLayout from "./FormItemLayout"
import removeTags from "./removeTags"

const FormItem = Form.Item;
const { TextArea } = Input;

const ControlParagraph = {
            key: "paragraph",
            title: "Абзац",
            create: () => {
                return  {
                    "type": "paragraph",
                    "label": "paragraph",
                    "subtype": "p"
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
                generator: (props) => {
                   const {
                      label
                    } = props;
                    return (<p>{removeTags(label)}</p>);
                },
                props: {}
            }
          };

export default ControlParagraph