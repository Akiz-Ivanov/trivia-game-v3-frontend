import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

interface ToggleSwitchProps {
    id: string
    label: string
    icon?: React.ReactNode
    checked: boolean
    onChange: (checked: boolean) => void
    className?: string
    switchClassName?: string
    labelClassName?: string
    statusClassName?: string
}

export default function ToggleSwitch({
    id,
    label,
    icon,
    checked,
    onChange,
    className,
    switchClassName,
    labelClassName,
    statusClassName
}: ToggleSwitchProps) {
    return (
        <div className={cn("flex items-center gap-6", className)}>
            <Switch
                id={id}
                checked={checked}
                onCheckedChange={onChange}
                className={cn("scale-135 cursor-pointer", switchClassName)}
            />
            <label htmlFor={id} className={cn("select-none", labelClassName)}>
                {label}
                <span className={cn("ml-2 font-semibold", checked ? 'text-chart-3' : 'text-white/50', statusClassName)}>
                    {icon ? 
                        icon :
                        checked ? "On" : "Off"
                    }
                </span>
            </label>
        </div>
    )
}