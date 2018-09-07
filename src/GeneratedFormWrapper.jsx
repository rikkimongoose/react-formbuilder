import React from 'react'
import PropTypes from 'prop-types'

import { Form } from 'antd'

import GeneratedForm from "./GeneratedForm"

class GeneratedFormWrapper extends React.Component {
  render() {
    const {
      documentId,
      prevValues,
      totalValues,
      formFields,
      formValues,
      isReadOnly,
      compressBlocksByHeaders
    } = this.props;

    const {
      form
    } = this.props;

    const formParams = {documentId,
      prevValues,
      totalValues,
      formFields,
      formValues,
      isReadOnly,
      compressBlocksByHeaders,
      form
    };

    return <GeneratedForm {...formParams} />;
  }
}

export default Form.create()(GeneratedFormWrapper);

GeneratedFormWrapper.PropTypes = {
  documentId: PropTypes.any,
  prevValues: PropTypes.array,
  totalValues: PropTypes.any,
  formFields: PropTypes.array,
  formValues: PropTypes.object,
  isReadOnly: PropTypes.bool,
  compressBlocksByHeaders: PropTypes.bool
}