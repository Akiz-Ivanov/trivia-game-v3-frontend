import type { RadioTheme, Settings } from "@/types/settings.types"
import { SettingsContext } from "./SettingsContext"
import useLocalStorageState from "@/hooks/useLocalStorageState"

export function SettingsProvider({ children }: { children: React.ReactNode }) {

    const [settings, setSettings] = useLocalStorageState<Settings>("settings", {
        animations: true,
        illustrations: true,
        backgroundGlow: true,
        sound: true,
        backgroundPattern: true,
        sparkles: true,
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

    const toggleSparkles = () => {
        setSettings(prevSettings => ({
            ...prevSettings,
            sparkles: !prevSettings.sparkles
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
            toggleSparkles,
            setRadioTheme
        }}>
            {children}
        </SettingsContext.Provider>
    )
}