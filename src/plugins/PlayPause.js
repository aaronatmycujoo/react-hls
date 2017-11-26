import React, { PureComponent  } from 'react'
import { inject } from 'mobx-react'

import {
    IconPlayArrow,
    IconPause,
} from 'material-icons/av'

@inject('playerStore')
export default class PlayPause extends PureComponent {

    renderIcon(isPlaying) {
        const { playerStore } = this.props
        if (isPlaying) {
            return (
                <IconPause
                    key="pause"
                    onClick={this.props.playStoggle.pause}
                />
            )
        } else {
            return (
                <IconPlayArrow
                    key="play"
                    onClick={this.props.playStoggle.play}
                />
            )
        }
    }

    render() {
        return (
            <div className="" key="play-pause">
                {this.renderIcon(this.props.isPlaying)}
            </div>
        )
    }
}
