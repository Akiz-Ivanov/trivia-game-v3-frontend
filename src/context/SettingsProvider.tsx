import type { RadioTheme, Settings } from "@/types/settings.types"
import { SettingsContext } from "./SettingsContext"
import useLocalStorageState from "@/hooks/useLocalStorageState"

export function SettingsProvider({ children }: { children: React.ReactNode }) {

    const [settings, setSettings] = useLocalStorageState<Settings>("settings", {
        animations: true,
        illustrations: true,
        backgroundPattern: true,
        backgroundGlow: true,
        sound: true,
        radioTheme: 'retro'
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

    const setRadioTheme = (theme: RadioTheme) => {
        setSettings(prevSettings => ({
            ...prevSettings,
            radioTheme: theme
        }))
    }

    return (
        <SettingsContext.Provider value={{
            settings,
            toggleAnimations,
            toggleIllustrations,
            toggleBackgroundPattern,
            toggleBackgroundGlow,
            toggleSound,
            setRadioTheme
        }}>
            {children}
        </SettingsContext.Provider>
    )
}