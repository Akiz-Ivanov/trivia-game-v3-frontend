import { toast } from 'sonner'
import { Lightbulb, CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react'
import type { ComponentType } from 'react'

type IconType = ComponentType<{ className?: string; size?: number | string }>

const ToastWrapper = ({
  icon: Icon,
  message,
  gradientFrom,
  gradientTo,
  borderColor,
  iconColor,
  textColor
}: {
  icon: IconType
  message: string
  gradientFrom: string
  gradientTo: string
  borderColor: string
  iconColor: string
  textColor: string
}) => (
  <div className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} border-l-4 ${borderColor} rounded-r-lg p-4`}>
    <div className="flex gap-3">
      <Icon className={`w-5 h-5 ${iconColor} flex-shrink-0 mt-0.5`} />
      <p className={`${textColor} text-sm`}>{message}</p>
    </div>
  </div>
)

export const showToastInfo = (message: string, icon?: IconType) => {
  toast.custom(() => (
    <ToastWrapper
      icon={icon || Lightbulb}
      message={message}
      gradientFrom="from-cyan-500/20"
      gradientTo="to-blue-500/20"
      borderColor="border-cyan-400"
      iconColor="text-cyan-400"
      textColor="text-cyan-300"
    />
  ))
}

export const showToastSuccess = (message: string, icon?: IconType) => {
  toast.custom(() => (
    <ToastWrapper
      icon={icon || CheckCircle}
      message={message}
      gradientFrom="from-green-500/20"
      gradientTo="to-emerald-500/20"
      borderColor="border-green-400"
      iconColor="text-green-400"
      textColor="text-green-300"
    />
  ))
}

export const showToastWarning = (message: string, icon?: IconType) => {
  toast.custom(() => (
    <ToastWrapper
      icon={icon || AlertTriangle}
      message={message}
      gradientFrom="from-yellow-500/20"
      gradientTo="to-orange-500/20"
      borderColor="border-yellow-400"
      iconColor="text-yellow-400"
      textColor="text-yellow-300"
    />
  ))
}

export const showToastError = (message: string, icon?: IconType) => {
  toast.custom(() => (
    <ToastWrapper
      icon={icon || XCircle}
      message={message}
      gradientFrom="from-red-500/20"
      gradientTo="to-rose-500/20"
      borderColor="border-red-400"
      iconColor="text-red-400"
      textColor="text-red-300"
    />
  ))
}

export const showToastNeutral = (message: string, icon?: IconType) => {
  toast.custom(() => (
    <ToastWrapper
      icon={icon || Info}
      message={message}
      gradientFrom="from-slate-500/20"
      gradientTo="to-gray-500/20"
      borderColor="border-slate-400"
      iconColor="text-slate-400"
      textColor="text-slate-300"
    />
  ))
}