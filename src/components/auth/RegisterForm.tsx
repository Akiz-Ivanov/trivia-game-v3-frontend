import { useState } from "react"
import RegularButton from "../common/RegularButton"
import registerService from "@/services/registerService"
import { toast } from "sonner"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "../ui/input"
import PassStrengthBar from "./PassStrengthBar"
import { CircleCheckBig, HelpCircle, ScrollText, TriangleAlert, XCircle } from "lucide-react"
import * as secureRandomPassword from "secure-random-password"
import RegisterPasswordField from "./RegisterPasswordField"
import useAvailabilityCheck from "@/hooks/useAvailabilityCheck"
import TooltipWrapper from "../common/TooltipWrapper"
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import type { AuthMode } from "./AuthDialog"
import type { ControllerRenderProps } from "react-hook-form"

type FormFieldType = {
  name: keyof FormSchema
  label: string
  type: string
  placeholder: string
  helperText?: string
  available?: boolean | null
}

type RegisterFormProps = {
  onSwitch: (m: AuthMode) => void
}

//TODO: ⚠️ Optional improvements: better error handling, loading state, updating user state, auto-close dialog, inline validation
//TODO: Forward backend messages to the frontend for validation if user with same email or username already exists

const formSchema = z.object({
  username: z.string()
    .nonempty("Please choose a username")
    .min(3, "Username must be at least 3 characters long")
    .max(30, "Username must be at most 30 characters long")
    .regex(/^[a-z0-9]+$/i, { message: "Must be alphanumeric" }),

  email: z.email({ message: "Email address is required" })
    .nonempty({ message: "This field is required" })
    .min(5, "Email must be at least 5 characters long")
    .max(254, "Email must be at most 50 characters long"),

  password: z.string()
    .nonempty("Password cannot be empty")
    .min(7, "Password must be at least 7 characters long")
    .max(128, "Password must be at most 128 characters long")
    .regex(/\d/, "Password must contain at least 1 number"),
})

export type FormSchema = z.infer<typeof formSchema>

const RegisterForm = ({ onSwitch }: RegisterFormProps) => {

  const [backendError, setBackendError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })

  const { available: usernameAvailable } = useAvailabilityCheck({ username: form.watch("username") })

  const { available: emailAvailable} = useAvailabilityCheck({ email: form.watch("email") })

  const onSubmit = async (values: FormSchema) => {
    setBackendError(null)
    try {
      await registerService.register(values)
      toast.success("Registered successfully!", {
        style: {
          fontWeight: 700,
          fontSize: "1rem",
          border: "2px solid var(--chart-3)",
        },
      })
    } catch (err) {
      if (err instanceof Error) setBackendError(err.message)
    }
  }

  const generatePassword = () => {
    return secureRandomPassword.randomPassword({
      length: 12,
      characters: [
        secureRandomPassword.lower,
        secureRandomPassword.upper,
        secureRandomPassword.digits,
        secureRandomPassword.symbols,
      ],
    });
  }

  const inputs: FormFieldType[] = [
    {
      name: "username",
      label: "Username",
      type: "text",
      placeholder: "JohnDoe99",
      helperText: "Alphanumeric only, 3-30 characters",
      available: usernameAvailable,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "example@gmail.com",
      helperText: "Valid email address, 5–254 characters",
      available: emailAvailable,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Password123",
      helperText: "Include a number, 7-128 characters"
    },
  ]

  const inputGroupElements = inputs.map(({ name, label, type, placeholder, helperText, available  }) => (
    <FormField
      key={name}
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {name === "password" ?
            <div className="flex flex-row w-full justify-between">
              <FormLabel className="w-1/2 text-15-16">
                {label}
                {helperText && (
                  <TooltipWrapper icon={<HelpCircle size={15} className="text-gray-700/90" />}>
                    {helperText}
                  </TooltipWrapper>
                )}
              </FormLabel>
              {field.value && <PassStrengthBar password={field.value} />}
            </div>
            :
            <FormLabel className="text-15-16">
              {label}
              {helperText && (
                <TooltipWrapper icon={<HelpCircle size={15} className="text-gray-700/90" />}>
                  {helperText}
                </TooltipWrapper>
              )}
            </FormLabel>
          }

          {name === "password" ? (
            <RegisterPasswordField
              field={field as ControllerRenderProps<FormSchema, "password">}
              placeholder={placeholder}
              generatePassword={generatePassword}
            />
          ) : (
            <div className="relative w-full">
              <FormControl>
                <Input
                  {...field}
                  type={type}
                  placeholder={placeholder}
                  className="placeholder:text-gray-600 placeholder:italic px-3 py-5 rounded-sm w-full"
                />
              </FormControl>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm">
                  {available === true && (
                    <TooltipWrapper 
                      icon={<CircleCheckBig size={18} className="text-chart-3" />} 
                      side="top"
                      contentClassName="bg-chart-3 text-slate-800 shadow-lg drop-shadow-2xl"
                      arrowClassName="fill-chart-3 bg-chart-3"
                    >
                      {label} is available
                    </TooltipWrapper>
                    )}
                  {available === false && (
                    <TooltipWrapper 
                      icon={<XCircle size={18} className="text-destructive" />} 
                      side="top"
                      contentClassName="bg-destructive text-slate-950 shadow-lg drop-shadow-2xl"
                      arrowClassName="fill-destructive bg-destructive"
                    >
                      {label} is already taken
                    </TooltipWrapper>
                    )}
                </span>
            </div>
          )
          }

          <FormMessage />
        </FormItem>
      )}
    />

  ))

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
        {inputGroupElements}
        <div className="flex flex-col gap-2">
          {backendError && (
            <p className="text-destructive text-sm text-center flex justify-center items-center gap-1">
              <TriangleAlert className="size-4" /> {backendError}
            </p>
          )}
          <RegularButton
            type="submit"
            className="inline-flex items-center justify-center gap-1 rounded-[1.5rem] mt-3 px-12 py-3 
                    text-white shadow-[0_4px_20px_rgba(166,119,227,0.4)] transition-all duration-300 ease
                    bg-gradient-to-br from-[#6e8efb] to-[#a777e3] text-[1.2rem] will-change-transform
                    hover:from-[#7aa2ff] hover:to-[#c187f2] hover:shadow-[0_6px_25px_rgba(166,119,227,0.6)] hover:-translate-y-1 font-bold
                    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00c3ffcc] focus-visible:shadow-[0_0_0_4px_rgba(0,195,255,0.3)]
                    active:scale-95 active:shadow-[0_3px_10px_rgba(166,119,227,0.3)] w-fit self-center
                    focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Register <ScrollText />
          </RegularButton>
        </div>
        <p className="text-15-16 text-center">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => onSwitch?.("login")}
            className="text-chart-3 hover:underline"
          >
            Login
          </button>
        </p>
      </form>
    </Form>
  )
}

export default RegisterForm