import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

interface ToggleSwitchProps {
    id: string
    label: string
    checked: boolean
    onChange: (checked: boolean) => void
}

export default function ToggleSwitch({
    id,
    label,
    checked,
    onChange,
}: ToggleSwitchProps) {
    return (
        <div className="flex items-center gap-6">
            <Switch
                id={id}
                checked={checked}
                onCheckedChange={onChange}
                className="scale-135 cursor-pointer"
            />
            <label htmlFor={id} className="select-none">
                {label}
                <span className={cn("ml-2 font-semibold", checked ? 'text-chart-3' : 'text-white')}>
                    {checked ? "On" : "Off"}
                </span>
            </label>
        </div>
    )
}