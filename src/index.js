import React, { Component, PropTypes } from 'react'
import Hls from 'hls.js'

import HlsWrapper from './HlsWrapper'

import styles from './index.css'

class ReactHls extends Component {
    render () {
        let { controls, url, poster, autoplay } = this.props
        return (
            <div key="reacthls" className={styles.root}>
              <HlsWrapper
                autoplay={autoplay}
                url={url}
                controls={controls}
                poster={poster}
              />
            </div>
        )
    }
}

ReactHls.propTypes = {
    url: PropTypes.string.isRequired,
    autoplay: PropTypes.bool,
    hlsConfig: PropTypes.object,
    controls: PropTypes.bool,
    poster: PropTypes.string
}

ReactHls.defaultProps = {
    autoplay: true,
    hlsConfig: {},
    controls: true,
}

export default ReactHls
