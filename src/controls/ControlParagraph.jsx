import React from 'react'

import {
    Input,
    InputNumber,
    Select,
    Tooltip,
    Form
} from 'antd'

import FormItemLayout from "./FormItemLayout"
import removeTags from "./removeTags"

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;

const typeTags = ["p", "address", "blockquote", "output"],
      types = typeTags.map(t => ({label: t, value: t})); 

const ControlParagraph = {
            key: "paragraph",
            title: "Абзац",
            create: () => {
                return  {
                    "type": "paragraph",
                    "label": "Абзац",
                    "subtype": "p"
                };
            },
            config: {
                generator: (props) => {
                    const {
                        subtype,
                        label,
                        className,
                        form
                    } = props;

                    const { getFieldDecorator } = form;

                    const typeOptions = types.map(t => <Option key={t.value} value={t.value}>{t.label}</Option>);

                    return (<span>
                            <FormItem {...FormItemLayout} label="Тип">
                              {getFieldDecorator('subtype', {
                                initialValue: subtype
                              })(
                                 <Select>
                                  {typeOptions}
                                 </Select>
                              )}
                              </FormItem>

                            <FormItem {...FormItemLayout} label="Текст">
                              {getFieldDecorator('label', {
                                initialValue: label
                              })(
                                <TextArea placeholder="Содержимое" />
                              )}
                              </FormItem>

                              <FormItem {...FormItemLayout} label="CSS класс">
                                {getFieldDecorator('className', {
                                  initialValue: className
                                })(
                                  <Input placeholder="CSS класс" />
                                )}
                                </FormItem>
                        </span>);
                }
            },
            view: {
                generator: (props) => {
                   const {
                      label,
                      subtype,
                      className
                    } = props;

                    const CustomTag = `${subtype}`;
                    const CustomTagParams = {
                      className
                    };

                    return (<CustomTag {...CustomTagParams}>{removeTags(label)}</CustomTag>);
                }
            }
          };

export default ControlParagraph