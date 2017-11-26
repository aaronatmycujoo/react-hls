import React, { PureComponent } from 'react'
import { observable, observe } from 'mobx'
import { observer, inject } from 'mobx-react'

@inject('pluginStore')
@observer
export default class InjectedPlugins extends PureComponent {
    @observable components = []

    getComponents = (matching) => {
        const { pluginStore } = this.props
        this.components = pluginStore.findPluginsMatching(matching)
    }

    componentDidMount() {
        this.getComponents(this.props.matching)
        this.setUpListener()
    }

    setUpListener() {
        const { pluginStore, matching } = this.props
        this.listener = observe(pluginStore.plugins, change => {
            this.components = pluginStore.findPluginsMatching(matching)
        })
    }

    componentWillUnmount() {
        if (this.listener) {
            this.listener()
        }
    }

    componentWillReceiveProps(next) {
        if (next.matching !== this.matching) {
            if (this.listener) {
                this.listener()
            }
            this.setUpListener()
        }
    }

    render() {
        const exposedProps = this.props.exposedProps || {}
        const elements = this.components.map(Component =>
            <Component.component
                key={Component.displayName}
                {...exposedProps}
            />
        )

        return (
            <div className={this.props.className} key={this.props.matching}>
                {elements}
            </div>
        )
    }
}
