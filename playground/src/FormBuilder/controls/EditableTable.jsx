import React from 'react'

import PropTypes from 'prop-types'

import {EditableFormRow, EditableCell} from './EditableFormRow'

import { Popconfirm, Button, Table, Icon, Tooltip } from 'antd'
import { Row, Col } from 'antd'

import generateUUID from './generateUUID'

class EditableTable extends React.Component {
  state = {
      data: [],
      count: 0
    }
  constructor(props) {
    super(props);
    const {
      columns,
      dataSource
    } = this.props;

    const { data = dataSource } = this.state;

    this.columns = [...columns, {
      title: '',
      dataIndex: 'operation',
      render: (text, record) => {
        return (
           data.length
            ? (
              <div>
                <Row>
                  <Col span={8}><a href="javascript:;"><Icon type="caret-up" theme="outlined" /></a></Col>
                  <Col span={8}><a href="javascript:;"><Icon type="caret-down" theme="outlined" /></a></Col>
                  <Col span={8}><Popconfirm title="Вы действительно хотите удалить?" onConfirm={() => this.handleDelete(record.key)}>
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
    const data = [...this.state.data];
    this.setState({ data: data.filter(item => item.key !== key) });
  }

  handleAdd = () => {
    const { count, data } = this.state;
    const { addItem = () => { label: "Название"}} = this.props;
    const newData = this.props.addItem();
    this.setState({
      data: [...data, newData],
      count: count + 1,
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
    return (
      <div>
      <Col>
        <Row>
          <Table
            components={components}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={dataSource}
            columns={columns}
          />
        </Row>
        <Row>
            <Col span={23}></Col>
            <Col span={1}>
              <Tooltip title="Добавить запись">
                <Button
                  type="primary"
                  onClick={this.handleAdd}
                  className="addVariantToList"
                  shape="circle"
                  icon="file-add"
                  size="large"
                  />
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