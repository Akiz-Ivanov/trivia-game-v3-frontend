export type Settings = {
    animations: boolean
    illustrations: boolean
    sound: boolean
    backgroundGlow: boolean
    backgroundPattern: boolean
    sparkles: boolean
    radioTheme: RadioTheme
}

export type SettingsContextType = {
    settings: Settings
    toggleAnimations: () => void
    toggleIllustrations: () => void
    toggleBackgroundGlow: () => void
    toggleSound: () => void
    setRadioTheme: (theme: RadioTheme) => void
    toggleBackgroundPattern: () => void
    toggleSparkles: () => void
}

export type RadioTheme = 'retro' | 'futuristic'