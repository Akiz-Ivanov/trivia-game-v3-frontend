import { useState, useEffect } from "react"
import { RotateCw, Loader2 } from "lucide-react"
import { Skeleton } from "../ui/skeleton"
import { cn } from "@/lib/utils"
import RegularButton from "./RegularButton"
import Card from "./Card"
import errorImg from '@/assets/svgs/error.svg'
import { useSettings } from "@/hooks/useSettings"
import { HiOutlineLightBulb } from "react-icons/hi";

type ErrorScreenProps = {
    error?: Error | null
    resetErrorBoundary: () => void
}

const ErrorScreen = ({ error, resetErrorBoundary }: ErrorScreenProps): React.JSX.Element => {
    //* ====== State ======
    const [seconds, setSeconds] = useState<number>(5)
    const [imageLoaded, setImageLoaded] = useState<boolean>(false)
    const { settings } = useSettings()
    const isAppCrash = Boolean(error)

    //* ====== Countdown ======
    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(prev => {
                if (prev === 1) {
                    clearInterval(interval)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <Card className="p-16-32">

            <p aria-live="assertive" className="sr-only">
                {isAppCrash
                    ? error?.message || "An unexpected error occurred. Please try again."
                    : "There was a problem fetching the questions. Please wait {seconds} seconds before retrying"
                }
            </p>

            {/* ====== Error Image or Skeleton ====== */}
            {settings.illustrations && (
                <div className="min-w-[min(18.75rem,80vw)] min-h-[min(18.75rem,80vw] relative">
                    {!imageLoaded && (
                        <Skeleton className="h-full w-full absolute " />
                    )}
                    <img
                        src={errorImg}
                        alt="Error"
                        onLoad={() => setImageLoaded(true)}
                        className={cn(
                            'error-img w-full h-full object-contain will-change-transform transform transition-all duration-800 ease-out',
                            {
                                'opacity-100 translate-y-0': imageLoaded && settings.animations,
                                'opacity-0 translate-y-5': !imageLoaded && settings.animations,
                                'opacity-100 translate-y-0 transition-none': !settings.animations,
                            }
                        )}
                    />
                </div>
            )}

            {/* ====== Info Message ====== */}
            <h2 className="text-error-foreground">
                {isAppCrash
                    ? "Something went wrong in the app."
                    : "Couldn't fetch questions from the database."}
            </h2>
            <strong className="text-chart-4">
                {isAppCrash
                    ? error?.message || "An unexpected error occurred. Return to the home page."
                    : (
                        <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-l-4 border-cyan-400 rounded-r-lg p-4 mb-6">
                            <div className="flex gap-3">
                                <HiOutlineLightBulb
                                    className="w-6 h-6 text-cyan-400 flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                />
                                <div>

                                    <p className="text-cyan-400">
                                        Most likely not enough questions found for the selected parameters. Try reducing the number of questions, changing the difficulty, or selecting a different category.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

            </strong>

            {!isAppCrash && (
                <strong className={`${seconds > 0 ? 'text-[#fb923c]' : 'text-[#9fffb8]'}`}>
                    {seconds > 0
                        ? `Please wait ${seconds} seconds and click the button below to try restarting the game.`
                        : "Click the button below to try restarting the game"}
                </strong>
            )}

            {/* ====== Play Again Button ====== */}
            <RegularButton
                className={cn(
                    'inline-flex items-center justify-center gap-1 rounded-[1.5rem] m-3 px-8 py-3 font-bold text-white shadow-[0_4px_20px_rgba(166,119,227,0.4)] transition-all duration-300 ease',
                    'bg-gradient-to-br from-[#6e8efb] to-[#a777e3] text-[1.2rem]',
                    'hover:from-[#7aa2ff] hover:to-[#c187f2] hover:shadow-[0_6px_25px_rgba(166,119,227,0.6)] hover:-translate-y-1',
                    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00c3ffcc] focus-visible:shadow-[0_0_0_4px_rgba(0,195,255,0.3)]',
                    'active:scale-95 active:shadow-[0_3px_10px_rgba(166,119,227,0.3)] will-change-transform',
                    'disabled:cursor-default disabled:opacity-50 disabled:transform-none disabled:shadow-none',
                    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    {
                        'font-semibold': seconds > 0,
                    }
                )}
                type="button"
                onClick={resetErrorBoundary}
                disabled={!isAppCrash && seconds > 0}
                aria-busy={!isAppCrash && seconds > 0}
            >
                {!isAppCrash && seconds > 0 ? `${seconds} sec` : 'Try Again'}
                {isAppCrash || seconds === 0 ? (
                    <RotateCw className="ml-1" size={20} strokeWidth={2} />
                ) : (
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                )}
            </RegularButton>
        </Card>
    )
}

export default ErrorScreen