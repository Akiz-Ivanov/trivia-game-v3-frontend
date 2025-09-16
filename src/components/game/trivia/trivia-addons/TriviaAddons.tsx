import { useState, useRef } from 'react'
import { Lightbulb, Sparkles, Loader2 } from 'lucide-react'

import aiApi from '@/services/aiApi'
import RegularButton from '../../../common/RegularButton'
import InfoPanelAI from './InfoPanelAI'

import type { TriviaQuestion } from '@/types/trivia-db.types'

type TriviaAddonsProps = {
    questionData: TriviaQuestion
    selectedAnswer: string | null
    handleFiftyFifty: (question: TriviaQuestion) => void
    removedAnswers: string[]
}

type GameAddonsState = {
    hint: string
    info: string
}

const TriviaAddons = ({
    questionData,
    selectedAnswer,
    handleFiftyFifty,
    removedAnswers
}: TriviaAddonsProps
): React.JSX.Element => {

    //*====== State ======
    const [gameAddons, setGameAddons] = useState<GameAddonsState>({ hint: "", info: "" })
    const [isLoading, setIsLoading] = useState<boolean>(false)

    //*====== Abort controller to cancel previous AI call if user clicks quickly ======
    const controllerRef = useRef<AbortController>(new AbortController())

    //*====== Handle AI Add-on Button (either Hint or Extra Info based on state) ======
    const handleAddonClick = () => {
        controllerRef.current.abort()
        controllerRef.current = new AbortController()

        setIsLoading(true)

        const { question: qText, correct_answer, category } = questionData
        const { signal } = controllerRef.current

        const method = selectedAnswer ? "getExtraInfo" : "getHint"

        const stateObjectKey = selectedAnswer ? "info" : "hint"

        aiApi[method]({ question: qText, answer: correct_answer, category, signal })
            .then(message => {
                setGameAddons(prev => ({ ...prev, [stateObjectKey]: message }))
            })
            .catch(error => {
                console.error("Error fetching hint:", error);
                setGameAddons(prev => ({ ...prev, [stateObjectKey]: "Sorry, couldn't fetch hint." }));
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    //*====== Button label ======
    const buttonLabel = selectedAnswer ? (
        <span className='flex flex-row items-center justify-center gap-2'>
            <Sparkles className="icon" size={20} color="var(--color-chart-3)" />
            Trivia Flavor
            {isLoading && (
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            )}
        </span>
    ) : (
        <span className='flex flex-row items-center justify-center gap-2'>
            <Lightbulb color="#facc15" fill="#facc15" className="icon" size={20} strokeWidth={2.5} />
            Get a Hint
            {isLoading && (
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            )}
        </span>
    )

    //* ====== Disabled logic / Force strict boolean (avoid '' or undefined issues) ======
    const hintUsed = !!(!selectedAnswer && gameAddons.hint)
    const infoUsed = !!(selectedAnswer && gameAddons.info)

    return (
        <div className="game-addons-container flex flex-col items-center justify-center gap-3-16 py-2 w-full xs:w-auto">
            <div className='flex items-center justify-center gap-8 w-full'>
                <RegularButton
                    type="button"
                    onClick={handleAddonClick}
                    disabled={isLoading || hintUsed || infoUsed}
                    aria-label={selectedAnswer ? "Get trivia info from the AI" : "Get hint from the AI"}
                    className="main-action purple-bg
                        inline-flex items-center justify-center
                        px-[1.2rem] py-[0.6rem] rounded-xl
                        transition-all duration-300 ease-in-out hover:scale-105
                        will-change-transform border-none text-base
                        active:scale-95 active:shadow-[0_0_8px_rgba(0,195,255,0.2)]
                        focus:border-none outline-none 
                        focus-visible:ring-2 focus-visible:ring-ring 
                        focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                    {buttonLabel}
                </RegularButton>

                <RegularButton
                    type="button"
                    onClick={() => handleFiftyFifty(questionData)}
                    disabled={!!selectedAnswer || isLoading || removedAnswers.length > 0 || questionData.incorrect_answers.length < 3}
                    aria-label="Eliminate two incorrect answers"
                    title="Eliminate two wrong answers"
                    className="fifty-fifty-btn main-action
                        border-2 border-chart-2 text-chart-3 !px-6
                        xs:!px-8 py-2 rounded-xl font-bold text-base
                        transition-all duration-300 ease-in-out will-change-transform
                        hover:bg-[#ff4fd830] hover:shadow-[0_0_10px_#ff4fd880]
                        active:scale-95 active:shadow-[0_0_8px_rgba(0,195,255,0.2)]
                        focus-visible:ring-2 focus-visible:ring-ring 
                        focus-visible:ring-offset-2 focus-visible:ring-offset-background
                        disabled:opacity-40"
                >
                    50 / 50
                </RegularButton>
            </div>

            <InfoPanelAI 
                content={gameAddons.info || gameAddons.hint} 
                open={!!gameAddons.hint || !!gameAddons.info}
            />

        </div>
    )
}

export default TriviaAddons