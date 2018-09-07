import React from 'react'

import PropTypes from 'prop-types'

import * as $ from 'jquery'

class FormBuilder extends React.Component {
  componentDidMount() {
    window.jQuery = $;
    window.$ = $;
    require('jquery-ui-sortable');
    require('formBuilder');

    const { formData = {} } = this.props;

    this.$formBuilderContainer = $(this.refs.formBuilderEditor).empty();

    if(this.props.isReadOnly) {
        this.$formBuilderEditor = this.$formBuilderContainer.formRender({
          formData: formData
        });
      } else {
      this.$formBuilderEditor = this.$formBuilderContainer.formBuilder({
        i18n: {
          locale: 'ru-RU'
        },
        onSave: this.props.onSave,
        disableFields: [
          'file',
          'button'
        ],
        formData: formData
      });
    }
  }
  render() {
    return (
             <div ref="formBuilderEditor">Редактор форм загружается...</div>
            );
    }
}

FormBuilder.propTypes = {
  session: PropTypes.object,
  formData: PropTypes.string,
  isReadOnly: PropTypes.any,
  onSave: PropTypes.func
}

export default FormBuilder;