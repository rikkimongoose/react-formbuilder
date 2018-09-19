import React from 'react'

import PropTypes from 'prop-types'

import EditableTable from './EditableTable'

import generateUUID from './generateUUID'

const updateWithKeys = data => data.map(s => (s.key) ? s : {...s, key: generateUUID() });

const columnsValueOnly = [
      {
        title: 'Значение',
        dataIndex: 'value',
        key: 'value',
      }
      ],
      columnsNameValue = [
      {
        title: 'Подпись',
        dataIndex: 'label',
        key: 'label',
      }, ...columnsValueOnly
      ];

class VariantsTable extends React.Component {

  render() {
    const {
      id = generateUUID(),
      dataSource = [],
      isValueOnly = false,
      onChange
    } = this.props

    const addItem = () => ({label: "", value: "", key: generateUUID()});
    const columns = (isValueOnly) ? columnsValueOnly : columnsNameValue;

    const EditableTableProps = {
      id,
      dataSource: updateWithKeys(dataSource),
      onChange,
      columns,
      addItem
    };

    return (
        <EditableTable
          {...EditableTableProps}
        />
    );
  }
}

export default VariantsTable;

VariantsTable.propTypes = {
    id: PropTypes.any,
    onChange: PropTypes.func,
    dataSource: PropTypes.array,
    isValueOnly: PropTypes.bool
}