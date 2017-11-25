import React, { Component, PropTypes } from 'react'
import { Provider, observer } from 'mobx-react'
import Hls from 'hls.js'

import PluginsStore from './stores/Plugins'

import InjectedPlugins from './components/InjectedPlugins'
import HlsWrapper from './components/HlsWrapper'

import styles from './index.css'

@observer
class ReactHls extends Component {
    @observable isPaused = this.props.autoplay
    constructor(props) {
        super(props)
        this.hls = new Hls(this.props.hlsConfig)

        PluginsStore.set(this.props.plugins)
    }

    componentWillReceiveProps(next) {
        if (next.plugins !== this.matching) {
            this.components = this.getComponents(next.matching)
            if (this.listener) {
                this.listener()
            }
            this.setUpListener()
        }
    }

    render () {
        const playerData = { url, poster, autoplay } = this.props

        const exposedProps = {
            isPaused: this.isPaused,
        }

        return (
            <Provider PluginsStore={PluginsStore}>
                <div key="reacthls" className={styles.root}>
                    <div className={styles.video}>
                        <HlsWrapper
                            {...playerData}
                            hls={this.hls}
                            controls={false}
                        />
                    </div>
                    <div className={styles.bottom}>
                        <InjectedPlugins
                            className={styles.left}
                            matching={'progress-bar'}
                            hls={this.hls}
                            exposedProps={exposedProps}
                        />
                        <InjectedPlugins
                            className={styles.left}
                            matching={'left-controls'}
                            hls={this.hls}
                            exposedProps={exposedProps}
                        />
                        <InjectedPlugins
                            className={styles.left}
                            matching={'right-controls'}
                            hls={this.hls}
                            exposedProps={exposedProps}
                        />
                    </div>
                </div>
            </Provider>
        )
    }
}

ReactHls.propTypes = {
    url: PropTypes.string.isRequired,
    autoplay: PropTypes.bool,
    hlsConfig: PropTypes.object,
    poster: PropTypes.string
}

ReactHls.defaultProps = {
    autoplay: true,
    hlsConfig: {},
}

export default ReactHls
