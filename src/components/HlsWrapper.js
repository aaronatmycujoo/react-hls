import React, { Component, PropTypes } from 'react'

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

        if (hls) { hls.destroy() }

        const { url, hlsConfig, autoplay } = this.props
        const { video: $video } = this.refs

        hls.attachMedia($video)
        hls.on(Hls.Events.MEDIA_ATTACHED, () => this.load(url))
    }

    load(url) {
        const { hls } = this.props
        hls.loadSource(url)
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
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
