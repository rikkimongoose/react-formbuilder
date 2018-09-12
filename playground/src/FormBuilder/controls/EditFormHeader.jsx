import React from 'react'

import {
    Input,
    InputNumber,
    Form,
    Checkbox
} from 'antd'
import FormItemLayout from "./FormItemLayout"

const FormItem = Form.Item;

const EditFormHeader = (props, form) => {
    const {
        required,
        readonly,
        label,
        placeholder,
        description,
        className,
        name
    } = props;

    const {
        getFieldDecorator
    } = form;

    return (<div>
      <FormItem {...FormItemLayout} label="Обязательный">
      {getFieldDecorator('required', {
      })(
        <Checkbox />
      )}
      </FormItem>
      <FormItem {...FormItemLayout} label="Только чтение">
      {getFieldDecorator('readonly', {
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
        </div>);
}

export default EditFormHeader;