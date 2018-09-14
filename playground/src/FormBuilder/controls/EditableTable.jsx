import React from 'react'

import PropTypes from 'prop-types'

import {EditableFormRow, EditableCell} from './EditableFormRow'

import { Popconfirm, Button, Table } from 'antd'
import { Row, Col } from 'antd'

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    const {
      columns
    } = this.props;

    this.columns = columns.concat([{
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record) => {
        const { dataSource } = this.state;
        return (
          dataSource.length >= 1
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
    }]);

    this.state = {
      dataSource: [],
      count: 0,
    };
  }

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  }

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = this.props.addItem();
    this.setState({
      dataSource: [...dataSource, newData],
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
    const { dataSource } = this.state;
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
        <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
          Add a row
        </Button>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
}

export default EditableTable;

EditableTable.propTypes = {
    key: PropTypes.any.isRequired,
    dataSource: PropTypes.array,
    columns: PropTypes.array,
    onChange: PropTypes.func,
    addItem: PropTypes.func.isRequired 
}