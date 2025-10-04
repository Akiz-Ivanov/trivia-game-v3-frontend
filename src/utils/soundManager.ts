import { Howl } from "howler"
import correctSoundSfx from '@/assets/audio/correct.mp3'

let isSoundEnabled = true

export const setSoundEnabled = (enabled: boolean) => {
    isSoundEnabled = enabled
}

const correctSound = new Howl({
    src: [correctSoundSfx],
    volume: 0.5
})

const playSound = (sound: Howl) => {
    if (!isSoundEnabled) return

    if (Howler.ctx.state === "suspended") {
        Howler.ctx.resume().then(() => sound.play())
    } else {
        sound.play()
    }
}

export const playCorrectSound = () => playSound(correctSound)