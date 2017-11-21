import React, { Component } from 'react'
import {
    IconPlayArrow,
    IconPause,
} from 'material-icons/av'

function renderIcon(isPaused) {
    if (isPaused) {
        return <IconPlayArrow />
    } else {
        return <IconPause />
    }
}

export default ({
    isPaused,
}) => (
    <div className="">
        {renderIcon(isPaused)}
    </div>
)
