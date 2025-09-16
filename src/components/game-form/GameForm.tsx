import { useRef, useEffect } from "react"
import { randomTitle } from "@/data/data"
import SelectGroup from "./SelectGroup"
import RegularButton from "../common/RegularButton"
import Card from "@/components/common/Card"
import { useSettings } from "@/hooks/useSettings"
import newYear from "@/assets/svgs/new-year.svg"
import cherryBlossom from "@/assets/svgs/cherry-blossom.svg"

import type { GameFormProps } from "../../types/game-form.types"

const GameForm = ({
    onSubmit,
    onChange,
    isFirstRender,
    formData
}: GameFormProps
): React.JSX.Element => {

    const { settings } = useSettings()

    const formRef = useRef<HTMLDivElement>(null)

    //* ====== Focus form ======
    useEffect(() => {
        if (!isFirstRender && formRef.current) {
            formRef.current.focus()
        }
    }, [])

    return (
        <div className="relative overflow-hidden xs:overflow-visible xs:rounded-xl">

            {/* ====== Side Glow ====== */}
            {settings.backgroundGlow && (
                <>
                    <div className="absolute inset-0 translate-x-[-100%]
                        bg-[radial-gradient(circle_at_150%_50%,rgba(0,195,255,0.4),transparent_45%)]"
                    />

                    <div className="absolute inset-0 translate-x-full
                        bg-[radial-gradient(circle_at_-50%_50%,rgba(214,0,186,0.6),transparent_45%)]"
                    />
                </>
            )}

            {/* ====== Form ====== */}
            <Card
                ref={formRef}
                tabIndex={-1}
                className="
                    relative gap-12 text-left 
                    bg-[url('/src/assets/svgs/balloons.svg')]
                    bg-[rgba(100,150,255,0.07)]"
            >
                <form
                    onSubmit={onSubmit}
                    className="flex flex-col justify-center gap-3 xs:gap-4 px-4 py-4 xs:py-8 rounded-[.5rem] w-full"
                >
                    <h1>{randomTitle}</h1>

                    {/* ====== Select Elements ====== */}
                    <SelectGroup onChange={onChange} formData={formData} />

                    {/* ====== Submit & Start Game ====== */}
                    <div className="flex flex-row justify-center relative">

                        <RegularButton
                            type="submit"
                            className="animate-flicker hover:animate-none focus:animate-none
                                        w-50 cursor-pointer px-4 py-2.5 mx-auto mt-2  z-999
                                        rounded-full font-semibold border-[3.5px] border-white 
                                        transition-all duration-400 ease-in-out will-change-transform
                                        text-shadow-[1px_1px_2px_oklch(62.3% 0.214 259.815),-1px_-1px_2px_oklch(62.3% 0.214 259.815)] 
                                        text-18-22 outline-none hover:scale-[1.05] 
                                        hover:shadow-[0_0_20px_rgba(0,255,255,0.5),0_0_40px_rgba(255,102,196,0.4)] 
                                        focus:ring-offset-1 focus:ring-offset-background
                                        focus-visible:ring-ring focus:border-white focus-visible:border-white
                                        animate-angle"                      
                        >
                            Start Game
                        </RegularButton>

                        {settings.illustrations && (
                            <img
                                src={newYear}
                                alt=""
                                className="absolute top-[-40%] left-0 w-40 opacity-70 hover:opacity-100 hover:brightness-125
                            transition-opacity duration-500 z-[1]"
                            />
                        )}

                        {settings.illustrations && (
                            <img
                                src={cherryBlossom}
                                alt=""
                                fetchPriority="high"
                                className="absolute top-[-60%] right-0 w-40 opacity-30 hover:opacity-100
                            transition-opacity duration-500 z-[1]"
                            />
                        )}

                    </div>
                    
                </form>
            </Card>
        </div>
    )
}

export default GameForm