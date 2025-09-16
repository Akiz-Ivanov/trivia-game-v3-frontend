import { data } from "../../data/data"

import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"

import SelectOption from "./SelectOption"

type SelectType = {
    onChange: (key: string, value: string) => void
    formData: { [key: string]: string }
}

type OptionType = {
    name?: string
    value: string
}

const SelectGroup = ({ onChange, formData }: SelectType): React.JSX.Element => {

    //* ====== Create select elements for each key in data object ======
    const selects = Object.entries(data).map(([key, value]) => {

        //* ====== Determine label text ======
        const labelText =
            key === "amount" ? "Number of questions" :
                key === "category" ? "Choose a category" :
                    "Pick a difficulty level"

        //* ====== Determine options to render ======
        const optionsToRender: OptionType[] =
            key === "amount" ? value
                : [{ name: `Any ${key}`, value: "Any" }, ...value]

        //* ====== Render option elements ======
        const optionElements = optionsToRender.map(({ name, value }, index) => {
            return (
                <SelectOption
                    key={value}
                    value={value}
                    isLast={index === optionsToRender.length - 1}
                >
                    {name ? name : value}
                </SelectOption>
            )
        })

        //* ====== Render select element ======
        return (
            <div key={key} className="select-wrapper w-full space-y-4">
                <label htmlFor={key} className="w-full font-medium">{labelText}</label>
                <Select
                    onValueChange={(value) => onChange(key, value)}
                    value={formData[key]}
                >
                    <SelectTrigger
                        id={key}
                        className="main-action w-full mt-2.5 cursor-pointer px-4 
                            hover:shadow-xl shadow-accent/10
                            hover:[text-shadow:0_0_6px_hsl(220_100%_70%)] 
                            ring-1 ring-ring bg-[oklch(20%_0.025_282_/_0.3)]"
                    >
                        <SelectValue placeholder={`${key}`} className="w-full cursor-pointer" />
                    </SelectTrigger>
                    <SelectContent className="w-full cursor-pointer">
                        {optionElements}
                    </SelectContent>
                </Select>
            </div>
        )
    })

    //* ====== Render select elements group ======
    return (
        <div className="flex flex-col gap-4">
            {selects}
        </div>
    )
}

export default SelectGroup