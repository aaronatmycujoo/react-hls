import React from 'react'
import { render } from 'react-dom'
import Player from './src/index'

render(<Player
  url={'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'}
/>, document.getElementById('root'))
