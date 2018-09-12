import React from 'react'

import PropTypes from 'prop-types'

import { Button, Input } from 'antd'
import { Row, Col } from 'antd'

import { DragDropContext } from 'react-beautiful-dnd'

import generateUUID from './generateUUID'

const Panel = Collapse.Panel;

class VariantsList extends React.Component {
    state = {
        localArray: []
    }

    render() {
        const {
            sourceArray,
            hasValueField,
            addToArray
        } = this.props;

        const onDragEnd = () => {
            // the only one that is required
        };

        const onDeleteItem = (item) => {

        }

        const DragDropContextProps = {onDragEnd};

        const generateControl = (item) => (hasValueField) ?
        (<div>
            <Col span={12}><Input placeholder="ПодписьControlPreview" /></Col>
            <Col span={12}><Input placeholder="Значение" /></Col>
        </div>) : (
            <div>
                <Col span={24}><Input placeholder="Значение" /></Col>
            </div>
        )

        const controls = sourceArray.map(item => (<Row key={generateUUID()}>
                {generateControl(item)}
                <Button type="danger" size="small" icon="close" onClick={() => onDeleteItem(item)} />
            </Row>);

        return (<DragDropContext {...DragDropContextProps}>{controls}</DragDropContext>);
        }
    }

export default VariantsList;

VariantsList.propTypes = {
    sourceArray: PropTypes.array,
    hasValueField: PropTypes.bool,
    addToArray: PropTypes.func
}