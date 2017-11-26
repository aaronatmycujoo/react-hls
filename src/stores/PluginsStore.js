import { observable, computed, action } from 'mobx'

import PlayPause from '../plugins/PlayPause'

export default class PluginsStore {
    @observable plugins = []

    constructor() {

        // load in default plugins
        this.register(PlayPause, { role: 'left-controls', displayName: 'PlayPause' })
    }

    findPluginsMatching(role) {
        return this.plugins.filter(plugin =>
            plugin.role === role
        )
    }

    @action
    register(component, { role, displayName }) {
        const index = this.plugins.map(plugin => plugin.component).indexOf(component)
        if (index === -1) {
            this.plugins.push({ component, role, displayName })
        }
    }

    @action
    unregister(component) {
        const index = this.plugins.map(plugin => plugin.component).indexOf(component)
        if (index !== -1) {
            plugins.splice(index, 1)
        }
    }
}
