import React, { PureComponent  } from 'react'
import { inject } from 'mobx-react'

import {
    IconPlayArrow,
    IconPause,
} from 'material-icons/av'

@inject(injectable => ({
    hls: injectable.hls,
    reacthls: injectable.ReactHls,
}))
export default class PlayPause extends PureComponent {

    renderIcon(isPlaying) {
        if (isPlaying) {
            return <IconPause />
        } else {
            return <IconPlayArrow />
        }
    }

    isPlaying = () => {
        const media = this.props.hls.media
        if (media) {
            return !!(media.currentTime > 0 && !media.paused && !media.ended && media.readyState > 2)
        } else {
            return false
        }
    }

    toggle = () => {
        console.log(this.props)
        const media = this.props.hls.media
        if (this.isPlaying()) {
            media.pause()
            this.props.reacthls.isPlaying = false
        } else {
            media.play()
            this.props.reacthls.isPlaying = true
        }
    }

    render() {
        const { hls } = this.props
        return (
            <div className="" key="play-pause" onClick={this.toggle}>
                {this.renderIcon(this.props.isPlaying)}
            </div>
        )
    }
}
