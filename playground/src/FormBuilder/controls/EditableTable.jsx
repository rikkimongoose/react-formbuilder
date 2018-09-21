import React from 'react'

import PropTypes from 'prop-types'

import {EditableFormRow, EditableCell} from './EditableFormRow'

import { Popconfirm, Button, Table, Icon, Tooltip } from 'antd'
import { Row, Col } from 'antd'

import generateUUID from './generateUUID'

class EditableTable extends React.Component {
  state = {}

  constructor(props) {
    super(props);
    const {
      columns
    } = props;

    const { dataSource = props.dataSource } = this.state;

    this.columns = [...columns, {
      title: '',
      dataIndex: 'operationMove',
      width: '5%',
      render: (text, record) => {
        return (
           dataSource.length
            ? (
              <div>
                <Row>
                  <Col span={12}><a href="javascript:;"><Icon type="caret-up" theme="outlined" /></a></Col>
                  <Col span={12}><a href="javascript:;"><Icon type="caret-down" theme="outlined" /></a></Col>
                </Row>
              </div>
            ) : null
        );
      },
    }, {
      title: '',
      dataIndex: 'operationEdit',
      width: '5%',
      render: (text, record) => {
        //const editable = this.isEditing(record);
        return (
           dataSource.length
            ? (
              <div>
                <Row>
                  <Col span={12}><a href="javascript:;"><Icon type="edit" theme="outlined" /></a></Col>
                  <Col span={12}><Popconfirm title="Вы действительно хотите удалить?" onConfirm={() => this.handleDelete(record.key)}>
                      <a href="javascript:;"><Icon type="delete" theme="outlined" /></a>
                    </Popconfirm>
                  </Col>
                </Row>
              </div>
            ) : null
        );
      },
    }];
  }

  handleDelete = (key) => {
    const { dataSource = this.props.dataSource} = this.state;
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  }

  handleAdd = () => {
    const { count, dataSource = this.props.dataSource } = this.state;
    const { addItem = () => { label: "Название"}} = this.props;
    const newData = this.props.addItem();
    this.setState({
      dataSource: [...dataSource, newData],
      count: newData.length + 1,
    });
  }

  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  }

  render() {
    const { dataSource = this.props.dataSource } = this.state;

    console.log(dataSource);

    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });

    const TableProps = {
      components,
      bordered: true,
      rowClassName: () => 'editable-row',
      dataSource,
      columns
    };

    return (
      <div>
      <Col>
        <Row>
          <Table
            {...TableProps}
          />
        </Row>
        <Row>
            <Col span={22}></Col>
            <Col span={2}>
              <Tooltip title="Добавить запись">
                <Button
                  type="primary"
                  onClick={this.handleAdd}
                  className="addVariantToList"
                  icon="file-add"
                  >
                  Добавить
                </Button>
              </Tooltip>
            </Col>
        </Row>
      </Col>
      </div>
    );
  }
}

export default EditableTable;

EditableTable.propTypes = {
    id: PropTypes.any.isRequired,
    dataSource: PropTypes.array,
    columns: PropTypes.array,
    onChange: PropTypes.func,
    addItem: PropTypes.func 
}