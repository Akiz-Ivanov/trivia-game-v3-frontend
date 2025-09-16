export type Settings = {
    animations: boolean
    illustrations: boolean
    backgroundPattern: boolean
    backgroundGlow: boolean
    sound: boolean
}

export type SettingsContextType = {
    settings: Settings
    toggleAnimations: () => void
    toggleIllustrations: () => void
    toggleBackgroundPattern: () => void
    toggleBackgroundGlow: () => void
    toggleSound: () => void
}