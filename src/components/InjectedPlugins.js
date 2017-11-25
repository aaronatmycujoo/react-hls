import React, { PureComponent } from 'react'
import { observable } from 'mobx'
import { observer, inject } from 'mobx-react'

@inject('PluginsStore')
@observer
export default class InjectedPlugins extends PureComponent {
    @observable components = []

    getComponents = (matching) => {
        const { PluginsStore } = this.props
        this.components = PluginsStore.findPluginsMatching(matching)
    }

    componentDidMount() {
        this.getComponents()
        this.setUpListener()
    }

    setUpListener() {
        const { PluginsStore, matching } = this.props
        this.listener = observe(PluginsStore.plugins, change => {
            console.log(change)
            this.components = PluginsStore.findPluginsMatching(matching)
        })
    }

    componentWillUnmount() {
        if (this.listener) {
            this.listener()
        }
    }

    componentWillReceiveProps(next) {
        if (next.matching !== this.matching) {
            this.components = this.getComponents(next.matching)
            if (this.listener) {
                this.listener()
            }
            this.setUpListener()
        }
    }

    render() {
        const exposedProps = this.props.exposedProps || {}
        const elements = this.components.map(Component =>
            <Component key={Component.displayName} {...exposedProps} />
        )

        return (
            <div className={this.props.className}>
                {elements}
            </div>
        )
    }
}
