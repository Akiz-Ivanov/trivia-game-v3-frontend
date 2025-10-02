import { useState } from "react"
import { FormControl } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, KeyRound } from "lucide-react"
import TooltipWrapper from "../common/TooltipWrapper"
import { showToastSuccess } from "../common/ToastWrapper"

import type { ControllerRenderProps} from "react-hook-form"
import type { FormSchema } from "./RegisterForm"

type RegisterPasswordFieldProps = {
  field: ControllerRenderProps<FormSchema, "password">
  placeholder: string
  generatePassword: () => string
}

const RegisterPasswordField = ({ field, placeholder, generatePassword }: RegisterPasswordFieldProps) => {

  const [showPassword, setShowPassword] = useState<boolean>(false)

  const handleGenerate = async () => {
    const password = generatePassword()
    field.onChange(password)
    setShowPassword(true)

    try {
      await navigator.clipboard.writeText(password)
      showToastSuccess("Random password generated & copied to clipboard!")
    } catch {
      showToastSuccess("Random password generated successfully!")
    }
  } 

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={handleGenerate}
        className="absolute top-1/2 right-10 -translate-y-1/2 text-gray-400 hover:text-white"
      >
        <TooltipWrapper
          icon={
            <KeyRound className="size-5 text-chart-3 hover:transform hover:scale-125 transition-transform duration-200" />
          }
          side="top"
          contentClassName="bg-chart-3 text-slate-800 shadow-lg drop-shadow-2xl leading-normal"
          arrowClassName="fill-chart-3 bg-chart-3"
        >
          Generates a secure password automatically <br /> (letters, numbers, symbols, 12+ characters)
        </TooltipWrapper>
      </button>
      <FormControl>
        <Input
          {...field}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className="placeholder:text-gray-600 placeholder:italic py-5 rounded-sm pr-10 pl-3"
        />
      </FormControl>
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white rounded-full"
        title={`${showPassword ? "Hide" : "Show"} password`}
      >
        {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
      </button>
    </div>
  )
}

export default RegisterPasswordField