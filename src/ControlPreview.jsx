import React from 'react'

import PropTypes from 'prop-types'

class ControlPreview extends React.Component {
    render() {
        const {
          controlPreviewGenerator,
          controlPreviewProps = {},
          controlData = {},
          form
        } = this.props;

        const controlView = controlPreviewGenerator({...controlPreviewProps, form}, controlData);

        return (<div>
            {controlView}
        </div>);
        }
    }

export default ControlPreview;

ControlPreview.PropTypes = {
    controlPreviewGenerator: PropTypes.func.isRequired,
    controlPreviewProps: PropTypes.object,
    controlData: PropTypes.object,
    form: PropTypes.any
}