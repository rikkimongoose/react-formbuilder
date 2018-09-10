import React from 'react'
import PropTypes from 'prop-types'

import { Form, AutoComplete, DatePicker, Checkbox, Input, InputNumber, Radio, Select, Button, Upload, Icon, Tooltip, Switch, Collapse, message } from 'antd'
import { Row, Col } from 'antd'

import moment from 'moment'

const FormItem = Form.Item,
      AutoCompleteOption = AutoComplete.Option,
      SelectOption = Select.Option,
      CheckboxGroup = Checkbox.Group,
      RadioGroup = Radio.Group,
      { TextArea } = Input,
      Panel = Collapse.Panel;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};

const colSpan = 3;

const clearKey = (key) =>  (!key || key === "undefined") ? "" : key;

const regexTag = /<[^>]*>/g;

const removeTags = (str) => str.replace(regexTag, "")

const generateUUID = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

const generateNum = (len) => Math.random().toString().substring(2, len + 2);

const createScreeningText = (key, control, data, generateScreenedFunc) => {
  const {
    prevValues,
    totalValues
  } = data;

  if(!totalValues) {
    return control;
  }

  const generateCol = (control, key) => <Col key={key} span={colSpan}>{control}</Col>;

  const generateScreenedDefault = (value) => <Input disabled value={value || ""} />,
        generateScreened = generateScreenedFunc || generateScreenedDefault;

  const alreadyScreened = [],
        futureScreened = [];

  let iter = 0;

  while(iter < prevValues.length) {
    const prevData = prevValues[iter];
    alreadyScreened.push(generateCol(generateScreened(prevData[key]), iter));
    iter++;
  }

  while(iter < totalValues) {
    futureScreened.push(generateCol(generateScreened(), iter));
    iter++;
  }
  return (<Row>
      {alreadyScreened}
      {generateCol(control, iter)}
      {futureScreened}
      </Row>);
}

const expandCheckBoxGroups = (controls) => {
  const resultControls = [];
  controls.forEach(c => {
    if(c.type !== "checkbox-group") {
      resultControls.push(c);
      return;
    }
    c.values.map(v => resultControls.push({...v, type: "checkbox", name: "checkbox-" + generateNum(13)}));
  });
  return resultControls;
}

const range = (start, end) => Array.from({length: (end - start)}, (v, k) => k + start);

const generateVisitsHeader = (visitsCount) => {
  const headers = range(0, visitsCount + 1).map(n => <Col key={n} span={colSpan}><h5 className="h-visit">{n}</h5></Col>);
  return <FormItem key={generateUUID()}
          {...formItemLayout}
          label="Визит"
        >
      <Tooltip title="Визит скрининга">
        {headers}
      </Tooltip>
    </FormItem>
}

class GeneratedForm extends React.Component {
  state = {
    fileList: [],
    activeCollapseKeys: {},
    cachedValues: {}
  }

  headersGeneration = []

  loadFormMethods() {
    const form = this.props.form,
      {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields
      } = form;

    return {
      form,
      getFieldDecorator,
      validateFields,
      getFieldsValue,
      resetFields
    };
  }

  // Controls
  createAutocomplete(control, props, localThis){
    const {
          prevValues,
          totalValues
        } = props;
    const children = control.values.map((option) => {
      return <AutoCompleteOption key={option.value}>{option.label}</AutoCompleteOption>;
    });
    const key = removeTags(control.label),
          rules = [{ required: control.required, message: `Укажите ${key}` }],
          initialValue = this.formValues[key] ? this.formValues[key] : control.value;
    return createScreeningText(key,
              <AutoComplete
                id={key}
                defaultValue={initialValue}
                style={{ width: 200 }}
                placeholder={control.placeholder}
                dataSource={children}
                disabled={localThis.isReadOnly}
                onChange = {(val) => localThis.setCachedValue(key, val)}
                filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
              />, { prevValues, totalValues });
  }

  createButton(control) {
    return <Button className={control.className}>{control.label}</Button>;
  }

  createDatePicker(control, props, localThis) {
    const {
          prevValues,
          totalValues
        } = props;
    const dateFormatInControl = 'YYYY-MM-DD',
          dateFormatForDisplay = 'DD.MM.YYYY',
          key = removeTags(control.label),
          rules = [{ required: control.required, message: `Укажите ${key}` }],
          valueStr = this.formValues[key] ? this.formValues[key] : control.value,
          value = valueStr ? moment(valueStr, dateFormatInControl) : null;

    const initialParamsForDatePicker = (params, initialValue) => (initialValue) ? {...params, initialValue} : params;

    const fieldDecoratorOptions = initialParamsForDatePicker({ rules }, value);

    return createScreeningText(key,
      this.getFieldDecorator(key, fieldDecoratorOptions)(
       <DatePicker
        placeholder={control.placeholder}
        onChange = {(val) => localThis.setCachedValue(key, val)}
        disabled={localThis.isReadOnly}
        format={dateFormatForDisplay} />
      ), { prevValues, totalValues });
  }

  createNumber(control, props, localThis) {
    const {
          prevValues,
          totalValues
        } = props;
    const key = removeTags(control.label),
          rules = [{ required: control.required, message: `Укажите ${key}` }],
          initialValue = this.formValues[key] || control.value;
    return createScreeningText(key,
            <InputNumber
              id={key}
              placeholder={control.placeholder}
              min={parseInt(control.min || 0, 10)}
              max={parseInt(control.max || 100, 10)} 
              step={parseInt(control.step || 1, 10)}
              defaultValue={parseInt(initialValue || 0, 10)}
              disabled={localThis.isReadOnly}
              onChange = {(val) => localThis.setCachedValue(key, val)}
              />, { prevValues, totalValues });
  }

  createCheckboxGroup(control, props, localThis) {
    const {
          prevValues,
          totalValues
        } = props;
    const isCheckboxGroup = control.label && control.label !== "undefined",
          isRequired = control.required,
          valuePropName = 'checked';

    const createCheckbox = (control) => {
              const key = removeTags(control.label),
                    initialValue = this.formValues[key] === control.value || control.selected,
                    rules = [{ required: isRequired, message: `Укажите ${key}` }];
              return this.getFieldDecorator(key, { rules, initialValue, valuePropName })(
                    <Checkbox disabled={localThis.isReadOnly}>{key}</Checkbox>
                );
            },
          createCheckboxesGrouped = (control) => {
              const key = removeTags(control.label),
                    items = control.values,
                    plainOptions = items.map((item) => item.label),        
                    initialValueFunc = this.formValues[key] ? variant => variant.value === this.formValues[key] : variant => variant.selected,
                    initialValue = items.filter(initialValueFunc).map((item) => item.label),
                    rules = [{ required: isRequired, message: `Укажите ${key}` }];

              return this.getFieldDecorator(key, { rules, initialValue, valuePropName })(
                    <CheckboxGroup
                      options={plainOptions}
                      disabled={localThis.isReadOnly}
                    />
                );
            };
    return (isCheckboxGroup) ?
              createCheckboxesGrouped(control, isRequired) :
              control.values.map((item) => createCheckbox(item, isRequired));
  }

  createCheckbox(control, props, localThis) {
    const {
          prevValues,
          totalValues
        } = props;
    const key = removeTags(control.label),
          initialValue = this.formValues[key] || control.selected,
          isRequired = control.required,
          rules = [{ required: isRequired, message: `Укажите ${key}` }],
          valuePropName = 'checked';
    return createScreeningText(key,
          this.getFieldDecorator(key, { rules, initialValue, valuePropName })(
            <Switch
              onChange = {(val) => localThis.setCachedValue(key, val)}
              disabled={localThis.isReadOnly}
            />
          ), { prevValues, totalValues },
            (value) => <Switch disabled checked={value === control.value} />,
      );
  }

  createRadioGroup(control, props, localThis) {
    const {
          prevValues,
          totalValues
        } = props;

    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };

    const key = removeTags(control.label),
          rules = [{ required: control.required, message: `Укажите ${key}` }],
          initialValueFunc = this.formValues[key] ? variant => variant.value === this.formValues[key] : variant => variant.selected,
          initialValue = control.values.find(initialValueFunc),
          children = control.values.map(
            variant => <Radio style={radioStyle} key={variant.label} value={variant.value}>{variant.label}</Radio>
          );

    return createScreeningText(key, this.getFieldDecorator(key, { rules, initialValue })(
          <RadioGroup
            onChange={(val) => localThis.setCachedValue(key, val)}
            disabled={localThis.isReadOnly}
          >
            {children}
          </RadioGroup>
          ), { prevValues, totalValues});
  }

  createSelector(control, props, localThis) {
    const {
          prevValues,
          totalValues
        } = props;

    const key = removeTags(control.label),
          rules = [{ required: control.required, message: `Укажите ${key}` }],
          initialValueFunc = this.formValues[key] ? variant => variant.value === this.formValues[key] : variant => variant.selected && variant.selected.value,
          initialValue = control.values.find(initialValueFunc),
          children = control.values.map((variant) => <SelectOption key={variant.value} value={variant.value}>{variant.label}</SelectOption>);

    return createScreeningText(key, this.getFieldDecorator(key, { rules, initialValue })(
      <Select
          ShowSearch
          placeholder={control.placeholder}
          optionFilterProp="children"
          disabled={localThis.isReadOnly}
          onChange = {(val) => localThis.setCachedValue(key, val)}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
        {children}
      </Select>),
      { prevValues, totalValues} );
  }

  createText(control, props, localThis) {
    const {
          prevValues,
          totalValues
        } = props;

    const key = removeTags(control.label),
          rules = [{ required: control.required, message: `Укажите ${key}` }],
          initialValue = this.formValues[key] || control.value,
          getFieldDecorator = props.form.getFieldDecorator;
    return createScreeningText(key, 
              <Input
                placeholder={control.placeholder}
                id={key}
                defaultValue={initialValue}
                disabled={localThis.isReadOnly}
                onChange = {(val) => localThis.setCachedValue(key, val)}
                />,
              { prevValues, totalValues});
  }

  createTextArea(control, props, localThis) {
    const {
          prevValues,
          totalValues
        } = props;

    const key = removeTags(control.label),
          rules = [{ required: control.required, message: `Укажите ${key}` }],
          initialValue = this.formValues[key] || control.value;

    return createScreeningText(key, 
              <TextArea
                placeholder={control.placeholder}
                id={key}
                defaultValue={initialValue}
                rows={control.rows}
                disabled={localThis.isReadOnly}
                onChange = {(val) => localThis.setCachedValue(key, val)}
                />,
              { prevValues, totalValues});
  }

  //Text blocks
  createBySubtype(control) {
    const CustomTag = `${control.subtype}`;
    return <CustomTag>{removeTags(control.label)}</CustomTag>;
  }

  createHeader(control) {
    const heads = this.headersGeneration;
    const CustomTag = `${control.subtype}`;

    let isStarting = false,
        isFinishing = false;
    if(!heads.length || heads[heads.length-1] !== CustomTag) {
      heads.push(CustomTag);
    }

    return <CustomTag>{control.label}</CustomTag>;
  }

  createBlock(control, props, localThis) {
    const { activeCollapseKeys = {}} = localThis.state;

    const controlId = control.label,
          currentKeys = activeCollapseKeys[controlId],
          panels = control.panels.map(p => <Panel header={p.label} key={p.key}>{localThis.drawControls(p.controls)}</Panel>),
          onCollapseChange = (keys) => {
            activeCollapseKeys[controlId] = keys;
            localThis.setState({activeCollapseKeys});
          }
    return <Collapse activeKey={currentKeys} onChange={onCollapseChange}>{panels}</Collapse>
  }

  drawHeaders(totalValues) {
    return (totalValues) ? <Row>{generateVisitsHeader(totalValues)}</Row> : <span />;
  }

  packControls(controls) {
    const regExpHeader = /h(\d+)/i;
    const generateLevel = control => parseInt(control.subtype.replace(regExpHeader, "$1"), 10);
    const createPanel = (control, key) => {
      return { label: control.label, key, controls: [] };
    }
    const createBlock = (level, panel) => {
      return {
        type: "block",
        level,
        panels: [panel],
        id: generateUUID()
      };
    }

    let i = 0, len = controls.length;
    const controlResults = [];
    let activeCollector = controlResults;
    const blocks = [];
    let activeBlock = null;
    
    while(i < len){
      const control = controls[i];
      i++;
      if(control.type !== "header" || !regExpHeader.test(control.subtype)) {
        activeCollector.push(control);
        continue;
      }
      const panel = createPanel(control, i),
            level = generateLevel(control);
      if(activeBlock) {
        if (activeBlock.level < level) {
          blocks.push(activeBlock);
          activeBlock = createBlock(level, panel);
          activeCollector.push(activeBlock);
        } else {
          if (activeBlock.level > level) {
            while(blocks.length && activeBlock.level > level) {
              activeBlock = blocks.pop();
            }
          }
          activeBlock.panels.push(panel);
        }
        activeCollector = panel.controls;
      } else {
        activeBlock = createBlock(level, panel);
        activeCollector.push(activeBlock);
        activeCollector = panel.controls;
      }
    }
    return controlResults;
  }

  setCachedValue(controlName, e) {
    /*const { cachedValues } = this.state;
    cachedValues[controlName] = e.target.value;
    this.setState({cachedValues});*/
  }

  drawControls(controls) {
    const formMethods = this.loadFormMethods();
    const { formValues, totalValues = 6, isReadOnly = false } = this.props;
    const { cachedValues } = this.state;
    this.isReadOnly = isReadOnly;
    const controlTypes = {
          'block': this.createBlock,
          'autocomplete': this.createAutocomplete,
          'button': this.createButton,
          'checkbox-group': this.createCheckboxGroup,
          'checkbox': this.createCheckbox,
          'date': this.createDatePicker,
          'file': this.createUpload,
          'number': this.createNumber,
          'radio-group': this.createRadioGroup,
          'text': this.createText,
          'select': this.createSelector,
          'textarea': this.createTextArea,
          formValues: { ...formValues, ...cachedValues },
          ...formMethods
        },
        textTypes = {
          'header': this.createBySubtype,
          'paragraph': this.createBySubtype,
        };

    const controlsToGenerate = totalValues ? expandCheckBoxGroups(controls) : controls;

    return controlsToGenerate.map((control) => {
      const uuid = () => generateUUID();
      const controlType = control.type;
      if(controlTypes[controlType]) {
        const generatedControl = controlTypes[controlType](control, this.props, this),
              generatedControls = Array.isArray(generatedControl) ? generatedControl : [generatedControl],
              children = generatedControls.map(
                (controlInput) => <FormItem key={uuid()}
                              {...formItemLayout}
                              label={clearKey(control.label)}
                              required={control.required}
                            >
                          <Tooltip title={control.description}>
                            {controlInput}
                          </Tooltip>
                        </FormItem>
              );

        return <div key={control.name || generateUUID()}>
          {children}
        </div>
      }
      if(textTypes[controlType]) {
        return <div key={control.label}>
            {textTypes[controlType](control)}
        </div>        
      }
      return "";
    });
  }

  drawPackedControls(controls){
    return this.drawControls(this.packControls(controls));
  }

  render() {
    const { 
      formFields = [],
      totalValues = 0,
      compressBlocksByHeaders = false
           } = this.props;
    return (
        <div>
              {this.drawHeaders(totalValues)}
              {compressBlocksByHeaders ? this.drawPackedControls(formFields) : this.drawControls(formFields)}
          </div>
            );
    }
}

export default GeneratedForm;

GeneratedForm.propTypes = {
  documentId: PropTypes.any,
  prevValues: PropTypes.array,
  totalValues: PropTypes.any,
  formFields: PropTypes.array,
  formValues: PropTypes.object,
  form: PropTypes.any,
  isReadOnly: PropTypes.bool,
  compressBlocksByHeaders: PropTypes.bool
}