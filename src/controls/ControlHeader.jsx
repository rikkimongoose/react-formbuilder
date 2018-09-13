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
const Option = Select.Option;

const types = [],
      headersCount = 6;
let i;
for(i = 1; i<headersCount; i++){
  const newHeader = "h"+i;
  types.push({
    label:newHeader,
    value:newHeader
  });
}

const ControlHeader = {
            key: "header",
            title: "Заголовок",
            create: () => {
                return  {
                    "type": "header",
                    "label": "Заголовок",
                    "className": "form-control",
                    "name": "header-1536598113435",
                    "subtype": "h1"
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
                                <Input placeholder="Содержимое" />
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
                      subtype,
                      label,
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

export default ControlHeader