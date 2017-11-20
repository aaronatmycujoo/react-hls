import React, { Component, PropTypes } from 'react'
import Hls from 'hls.js'

class ReactHls extends Component {
    constructor(props) {
        super(props)
        this.hls = null
    }
    componentDidUpdate () {
        this.init()
    }

    componentDidMount () {
        this.init()
    }

    componentWillUnmount() {
        let { hls } = this

        if (hls) {
            hls.destroy()
        }
    }

    init() {
        if (this.hls) {
            this.hls.destroy()
        }

        let { url, autoplay, hlsConfig } = this.props
        let { video : $video } = this.refs
        let hls = new Hls(hlsConfig)

        hls.loadSource(url)
        hls.attachMedia($video)
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
            if (autoplay) {
                $video.play()
            }
        })

        this.hls = hls
    }

    render () {
        let { controls, width, height, poster } = this.props

        return (
            <div key="video">
              <video
                ref="video"
                className="hls-player"
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
    autoplay: false,
    hlsConfig: {},
    controls: true,
}

export default ReactHls
