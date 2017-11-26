import React, { Component, PropTypes } from 'react'
import { observable } from 'mobx'
import { Provider, observer } from 'mobx-react'
import Hls from 'hls.js'

import PluginsStore from './stores/PluginsStore'

import InjectedPlugins from './components/InjectedPlugins'

const pluginStore = new PluginsStore()

const styles = {}

@observer
class ReactHls extends Component {
    @observable isPlaying = false
    constructor(props) {
        super(props)
        this.hls = new Hls(this.props.hlsConfig)
        this.props.plugins.forEach(({ component, role }) => PluginsStore.register(component, role))
        this.init()
    }

    init() {
        const { hls } = this
        const { url, hlsConfig, autoPlay } = this.props

        hls.attachMedia(this.refs.video)
        hls.on(Hls.Events.MEDIA_ATTACHED, () => {
            hls.loadSource(url)
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                if (autoPlay) {
                    this.refs.video.play()
                    this.toggle(true)
                } else {
                    this.toggle(false)
                }
            })
        })
    }

    toggle = isPlaying => {
        this.isPlaying = isPlaying
    }

    componentDidMount() {
        this.init()
    }

    componentWillUnmount() {
        const { hls } = this
        if (hls) {
            hls.destroy()
        }
    }

    render () {
        const { poster, autoPlay } = this.props

        const exposedProps = {
            isPlaying: this.isPlaying,
        }

        return (
            <Provider pluginStore={pluginStore} hls={this.hls} ReactHls={this}>
                <div key="reacthls" className={styles.root}>
                    <div className={styles.video}>
                        <video
                            ref="video"
                            poster={poster}
                            autoPlay={autoPlay}
                            controls={false}
                        />
                    </div>
                    <div className={styles.bottom}>
                        <InjectedPlugins
                            className={styles.left}
                            matching={'progress-bar'}
                            exposedProps={exposedProps}
                        />
                        <InjectedPlugins
                            className={styles.left}
                            matching={'left-controls'}
                            exposedProps={exposedProps}
                        />
                        <InjectedPlugins
                            className={styles.left}
                            matching={'right-controls'}
                            exposedProps={exposedProps}
                        />
                    </div>
                </div>
            </Provider>
        )
    }
}

ReactHls.defaultProps = {
    autoPlay: true,
    plugins: [],
}

export default ReactHls
