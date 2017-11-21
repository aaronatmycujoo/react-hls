import React, { Component, PropTypes } from 'react'
import Hls from 'hls.js'

class HlsWrapper extends Component {
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

        let { url, hlsConfig, autoplay } = this.props
        let { video : $video } = this.refs

        const hls = new Hls(hlsConfig)
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
        let { controls, poster } = this.props

        return (
            <video
                ref="video"
                className="hls-player"
                controls={false}
                poster={poster}
            />
        )
    }
}

export default HlsWrapper
