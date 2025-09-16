import {
    SelectItem,
    SelectSeparator
} from "@/components/ui/select"

type SelectOptionProps = {
    value: string
    children: string
    isLast?: boolean
}

const SelectOption = ({ value, children, isLast }: SelectOptionProps): React.JSX.Element => {

    return (
        <>
            <SelectItem key={value} value={value} className="w-full cursor-pointer">
                {children}
            </SelectItem>
            {!isLast && <SelectSeparator />}
        </>
    )
}

export default SelectOption