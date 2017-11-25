import React, { Component, PropTypes } from 'react'
import { observable } from 'mobx'
import { Provider, observer } from 'mobx-react'
import Hls from 'hls.js'

import PluginsStore from './stores/Plugins'

import InjectedPlugins from './components/InjectedPlugins'
import HlsWrapper from './components/HlsWrapper'

const styles = {}
@observer
class ReactHls extends Component {
    @observable isPaused = true
    constructor(props) {
        super(props)
        this.hls = new Hls(this.props.hlsConfig)

        this.props.plugins.forEach(({ component, role }) => PluginsStore.register(component, role))
    }

    render () {
        const { url, poster, autoplay } = this.props

        const playerData = { url, poster, autoplay }
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

export default ReactHls
