import { observable, computed, action } from 'mobx'

import '../plugins/PlayPause'

export default class PluginsStore {
    @observable plugins = []

    constructor() {
        // load in default plugins
        this.register(PlayPause, { role: 'left-controls' })
    }

    @computed
    findPluginsMatching(role) {
        return this.plugins.filter(plugin => plugin.role === role)
    }

    @action
    register(component, { role }) {
        const plugins = this.plugins
        const index = plugins.indexOf(component)
        if (index === -1) {
            component.role = component
            plugins.push(component)
        }
    }

    @action
    unregister(component) {
        const plugins = this.plugins
        const index = plugins.indexOf(component)
        if (index !== -1) {
            plugins.splice(index, 1)
        }
    }
}
