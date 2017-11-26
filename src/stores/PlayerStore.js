import { observable, computed, action } from 'mobx'

export default class PlayerStore {
    @observable paused = true
    media = null

    pause() {
        if (!this.media) {
            return
        }
        this.media.pause()
        this.paused = true
    }

    play() {
        if (!this.media) {
            return
        }
        this.media.play()
        this.paused = false
    }

    attachMedia(media) {
        this.media = media
    }

    isPlaying() {
        const media = this.media
        if (media) {
            return !!(media.currentTime > 0 && !media.paused && !media.ended && media.readyState > 2)
        } else {
            return false
        }
    }
}
