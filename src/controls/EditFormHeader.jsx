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
        initialValue: required
      })(
        <Checkbox />
      )}
      </FormItem>
      <FormItem {...FormItemLayout} label="Только чтение">
      {getFieldDecorator('readonly', {
        initialValue: readonly
      })(
        <Checkbox />
      )}
      </FormItem>
    <FormItem {...FormItemLayout} label="Название">
      {getFieldDecorator('label', {
        initialValue: label
      })(
        <Input placeholder="Название" />
      )}
      </FormItem>

    <FormItem {...FormItemLayout} label="Подсказка">
      {getFieldDecorator('placeholder', {
        initialValue: placeholder
      })(
        <Input placeholder="Подсказка" />
      )}
      </FormItem>

    <FormItem {...FormItemLayout} label="Всплывающая подсказка">
      {getFieldDecorator('description', {
        initialValue: description
      })(
        <Input placeholder="Всплывающая подсказка" />
      )}
      </FormItem>

    <FormItem {...FormItemLayout} label="CSS класс">
      {getFieldDecorator('className', {
        initialValue: className
      })(
        <Input placeholder="CSS класс" />
      )}
      </FormItem>

    <FormItem {...FormItemLayout} label="Идентификатор">
      {getFieldDecorator('name', {
        initialValue: name
      })(
        <Input placeholder="Идентификатор" />
      )}
      </FormItem>
        </div>);
}

export default EditFormHeader;