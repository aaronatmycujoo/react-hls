import React, { Component, PropTypes } from 'react'
import { Events } from 'hls.js'

export default class HlsWrapper extends Component {
    componentDidMount() {
        this.init()
    }

    componentWillUnmount() {
        const { hls } = this.props

        if (hls) {
            hls.destroy()
        }
    }

    init() {
        const { hls } = this.props

        const { url, hlsConfig } = this.props
        const { video: $video } = this.refs

        hls.attachMedia($video)
        hls.on(Events.MEDIA_ATTACHED, () => this.load(url))
    }

    load(url) {
        const { hls, autoplay } = this.props
        hls.loadSource(url)
        hls.on(Events.MANIFEST_PARSED, () => {
            if (autoplay) {
                $video.play()
            }
        })
    }

    render () {
        const { controls, poster } = this.props

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
