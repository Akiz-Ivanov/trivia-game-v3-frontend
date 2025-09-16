import { useEffect } from "react"
import { Howler } from "howler"
import { setSoundEnabled } from "@/utils/soundManager"

export const useSoundManager = (soundEnabled: boolean) => {
    useEffect(() => {
        const resumeAudio = () => {
            if (Howler.ctx.state === "suspended") {
                Howler.ctx.resume()
            }
            window.removeEventListener("click", resumeAudio)
        }

        window.addEventListener("click", resumeAudio)
        return () => window.removeEventListener("click", resumeAudio)
    }, [])

    useEffect(() => {
        setSoundEnabled(soundEnabled)
    }, [soundEnabled])
}