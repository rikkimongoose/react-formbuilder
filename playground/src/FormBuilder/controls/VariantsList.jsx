import React from 'react'

import PropTypes from 'prop-types'

import { Button, Input, Collapse, Tooltip } from 'antd'
import { Row, Col } from 'antd'

import { DragDropContext } from 'react-beautiful-dnd'

import generateUUID from './generateUUID'

const Panel = Collapse.Panel;

const columnsLabelValue = [{
  title: 'Подпись',
  dataIndex: 'value',
  key: 'value',
  editable: true
}, {
  title: 'Значение',
  dataIndex: 'value',
  key: 'value',
  editable: true,
}];

const columnsValue = [{
  title: 'Значение',
  dataIndex: 'value',
  key: 'value',
  editable: true,
}];

class VariantsList extends React.Component {
    state = {}
    render() {
        const {
            key,
            source = [],
            hasValueField = true,
            onChange = () => {}
        } = this.props;

        const sourceWithKeys = source.map(s => (s.id) ? s : {...s, key: generateUUID() });

        const {
            currentSource = sourceWithKeys
        } = this.state;

        const onDragEnd = () => {
            // the only one that is required
        };

        const addEmptyItem = () => {
            currentSource.push({label: "", value: "", key: generateUUID()});
            onChange(key, currentSource);
            this.setState({currentSource});
        }

        const deleteItem = (item) => {
            const currentSourceNew = currentSource.filter(i => i.id !== item.id);
            onChange(key, currentSourceNew);
            this.setState({currentSource: currentSourceNew});
        }


        const changeLabel = (id, value) => {

        }

        const changeValue = (id, value) => {

        }

        const DragDropContextProps = {onDragEnd};

        const generateControl = (item) => {
            const { id, label, value } = item;
            return (hasValueField) ?
            (<div>
                <Col span={11}><Input placeholder="Подпись" value={label} /></Col>
                <Col span={12}><Input placeholder="Значение" value={value} /></Col>
                <Col span={1}><Tooltip title="Удалить"><Button type="danger" size="small" icon="close" onClick={() => deleteItem(item)} /></Tooltip></Col>
            </div>) : (
            <div>
                <Col span={23}><Input placeholder="Значение" /></Col>
                <Col span={1}><Tooltip title="Добавить"><Button type="danger" size="small" icon="close" onClick={() => deleteItem(item)} /></Tooltip></Col>
            </div>
            );
        }

        const controls = currentSource.map(item => (<Row key={generateUUID()}>
                {generateControl(item)}
            </Row>));

        return (<div>
            <Row>
                <DragDropContext {...DragDropContextProps}>{controls}</DragDropContext>
            </Row>
            <Row>
            <Col span={23}></Col>
            <Col span={1}><Tooltip title="Добавить запись"><Button type="primary" onClick={addEmptyItem} className="addVariantToList" icon="file-add" size="large">Добавить запись</Button></Tooltip></Col>
            </Row>
            </div>);
        }
    }

export default VariantsList;

VariantsList.propTypes = {
    key: PropTypes.any.isRequired,
    source: PropTypes.array,
    hasValueField: PropTypes.bool,
    onChange: PropTypes.func
}