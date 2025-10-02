import { useSettings } from "@/hooks/useSettings"
import { Settings } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog"
import ToggleSwitch from "./ToggleSwitch"

import settingsImg from "@/assets/svgs/settings.svg"

type SettingsDialogProps = {
    open?: boolean
    onOpenChange?: (open: boolean) => void
}

const SettingsDialog = ({ open, onOpenChange }: SettingsDialogProps) => {

    const { settings, toggleAnimations, toggleIllustrations, toggleBackgroundPattern, toggleBackgroundGlow, toggleSound } = useSettings()

    const { animations, illustrations, backgroundPattern, backgroundGlow, sound } = settings

    const isControlled = open !== undefined && onOpenChange !== undefined

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {!isControlled && (
                <DialogTrigger asChild>
                    <button
                        type="button"
                        aria-label="Open settings"
                        className="absolute top-2 right-2 sm:top-4 sm:right-4 z-50 rounded-full p-1 "
                    >
                        <Settings className="size-6 text-chart-4 hover:animate-[spin_1s_ease-in-out] cursor-pointer" />
                    </button>
                </DialogTrigger>)}
            <DialogContent
                className="flex flex-col gap-6"
                style={{
                    backgroundImage: illustrations ? `url(${settingsImg})`: "none",
                    backgroundSize: "cover"
                }}
            >
                <DialogHeader>
                    <DialogTitle className="text-center text-18-22">Settings</DialogTitle>
                    <DialogDescription className="text-center text-sm italic mb-2" >
                        Toggle optional settings to customize your game.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid xs:grid-cols-2 gap-4">
                    <ToggleSwitch id="animations-toggle" label="Animations" checked={animations} onChange={toggleAnimations} />
                    <ToggleSwitch id="illustrations-toggle" label="Illustrations" checked={illustrations} onChange={toggleIllustrations} />
                    <ToggleSwitch id="background-pattern-toggle" label="Background" checked={backgroundPattern} onChange={toggleBackgroundPattern} />
                    <ToggleSwitch id="glow-toggle" label="Glow" checked={backgroundGlow} onChange={toggleBackgroundGlow} />
                    <ToggleSwitch id="sound-toggle" label="Sound" checked={sound} onChange={toggleSound} />
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default SettingsDialog