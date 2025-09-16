import type { Settings } from "@/types/settings.types"
import { SettingsContext } from "./SettingsContext"
import useLocalStorageState from "@/hooks/useLocalStorageState"

export function SettingsProvider({ children }: { children: React.ReactNode }) {

    const [settings, setSettings] = useLocalStorageState<Settings>("settings", {
        animations: true,
        illustrations: true,
        backgroundPattern: true,
        backgroundGlow: true,
        sound: true,
    })

    const toggleAnimations = () => {
        setSettings(prevSettings => ({
            ...prevSettings,
            animations: !prevSettings.animations
        }))
    }

    const toggleIllustrations = () => {
        setSettings(prevSettings => ({
            ...prevSettings,
            illustrations: !prevSettings.illustrations
        }))
    }

    const toggleBackgroundPattern = () => {
        setSettings(prevSettings => ({
            ...prevSettings,
            backgroundPattern: !prevSettings.backgroundPattern
        }))
    }

    const toggleSound = () => {
        setSettings(prevSettings => ({
            ...prevSettings,
            sound: !prevSettings.sound
        }))
    }

    const toggleBackgroundGlow = () => {
        setSettings(prevSettings => ({
            ...prevSettings,
            backgroundGlow: !prevSettings.backgroundGlow
        }))
    }

    return (
        <SettingsContext.Provider value={{
            settings,
            toggleAnimations,
            toggleIllustrations,
            toggleBackgroundPattern,
            toggleBackgroundGlow,
            toggleSound
        }}>
            {children}
        </SettingsContext.Provider>
    )
}