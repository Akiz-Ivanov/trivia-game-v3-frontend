import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"
import { ArrowRight, BarChart2 } from "lucide-react"

import { getPreloadedCategoryBg } from "@/assets/imports.ts"
import shuffleArray from "@/utils/shuffle.js"
import insertSoftHyphens from "@/utils/insertSoftHyphens.js"
import RegularButton from "../../common/RegularButton.js"
import GameMeta from "./GameMeta.js"
import TriviaAddons from "./trivia-addons/TriviaAddons.js"
import { useSettings } from "@/hooks/useSettings.js"
import Card from "@/components/common/Card.js"

import type { TriviaQuestion } from "@/types/trivia-db.types.js"
import type { Category } from "@/types/imports.types.js"
import { motion } from "framer-motion"

type QuizCardProps = {
    questionData: TriviaQuestion,
    answers: string[],
    processAnswerSelection: (answer: string, isCorrect: boolean) => void,
    nextQuestion: () => void,
    isLastQuestion: boolean,
    selectedAnswer: string | null,
    currentQuestionIndex: number,
    numOfQuestions: number
    handleShowResults: () => void,
}

export default function QuizCard({
    questionData,
    answers,
    processAnswerSelection,
    nextQuestion,
    isLastQuestion,
    selectedAnswer,
    currentQuestionIndex,
    numOfQuestions,
    handleShowResults,
}: QuizCardProps): React.JSX.Element {

    //* State values
    const [removedAnswers, setRemovedAnswers] = useState<string[]>([])
    const [bgUrl, setBgUrl] = useState<string | null>(null)
    const { settings } = useSettings()

    //* Constants
    const shouldAnimate = settings.animations

    //* Refs
    const nextButtonRef: React.RefObject<HTMLButtonElement | null> = useRef<HTMLButtonElement>(null);

    //* ====== Focus on next question button when answer is selected ======
    useEffect(() => {
        if (selectedAnswer) {
            nextButtonRef.current?.focus()
        }
    }, [selectedAnswer])

    //* ====== Reset removedAnswers when question changes ======
    useEffect(() => {
        setRemovedAnswers([])
    }, [questionData])

    //* ====== Load category background ======
    useEffect(() => {
        const url = getPreloadedCategoryBg(questionData.category as Category)
        setBgUrl(url)
    }, [questionData.category])

    //* ====== 50/50 Hint logic ======
    function handleFiftyFifty(questionData: TriviaQuestion) {
        const shuffledIncorrect = shuffleArray(questionData.incorrect_answers)
        const removed: string[] = shuffledIncorrect.slice(0, 2)
        setRemovedAnswers(removed)
    }

    //* ====== Render Answers ======
    const renderAnswers = answers.map((answer: string) => {

        const isSelected = answer === selectedAnswer;
        const isCorrect = answer === questionData.correct_answer;
        const isIncorrect = isSelected && !isCorrect;
        const isDisabled = !!selectedAnswer || removedAnswers.includes(answer);
        const isNeutral = isDisabled && !isCorrect && !isIncorrect;

        return (
            <motion.button
                key={`${questionData.id}-${answer}`}
                whileHover={{ scale: 1.05 }}
                type="button"
                role="listitem"
                onClick={() => processAnswerSelection(answer, isCorrect)}
                aria-pressed={isSelected}
                disabled={isDisabled}
                aria-disabled={isDisabled}
                tabIndex={isDisabled ? -1 : 0}
                className={cn(
                    "w-full min-h-[4rem] font-medium box-border text-15-16",
                    "flex items-center justify-center text-center px-4 py-2",
                    "rounded-full xs:rounded-md border-2 border-white/30",
                    "bg-origin-border will-change-transform",
                    "transition-transform duration-200 ease-in-out",
                    "hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(0,195,255,0.4)]",
                    "active:scale-95 active:shadow-[0_0_8px_rgba(0,195,255,0.2)]",
                    "focus:border-none outline-none",
                    "focus-visible:ring-2 focus-visible:ring-ring",
                    "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    {
                        "bg-correct": selectedAnswer && isCorrect,
                        "bg-incorrect": isIncorrect,
                        "!opacity-100": (isCorrect || isIncorrect) && isDisabled,
                        "cursor-default pointer-events-none": isDisabled,
                        "opacity-50 scale-100 shadow-none hover:shadow-none hover:scale-100 bg-[linear-gradient(135deg,rgba(0,195,255,0.8),rgba(214,0,186,0.8))]": isNeutral,
                        "bg-[linear-gradient(135deg,rgba(0,195,255,0.8),rgba(214,0,186,0.8))]": !selectedAnswer
                    }
                )}
            >
                <span>{answer}</span>
            </motion.button>
        )
    })

    const isCorrect = selectedAnswer === questionData.correct_answer
    const difficultyShadow = `var(--shadow-${questionData.difficulty})`
    const isXs = window.matchMedia("(min-width: 480px)").matches;

    return (
        <Card
            key={questionData.id}
            asMotion={true}
            className={cn(
                "game-card gap-3-16 text-15-18 px-16-64 py-6 md:p-6",
                {
                    "xs:shadow-hard": questionData.difficulty === "hard",
                    "xs:shadow-medium": questionData.difficulty === "medium",
                    "xs:shadow-easy": questionData.difficulty === "easy",
                }
            )}
            style={{
                backgroundImage: bgUrl && settings.illustrations ? `url(${bgUrl})` : "none",
                willChange: shouldAnimate ? 'transform, opacity' : 'auto',
            }}
            initial={shouldAnimate ? { opacity: 0 } : undefined}
            animate={shouldAnimate ? {
                opacity: 1,
                boxShadow: selectedAnswer && isXs ? [
                    `0 0 0 calc(4px + 1px) rgba(255,255,255,0.06), ${difficultyShadow}`, // default
                    `0 0 0 calc(4px + 1px) ${isCorrect ? 'rgba(34,197,94,0.8)' : 'rgba(239,68,68,0.8)'}, ${difficultyShadow}`, //* flash
                    `0 0 0 calc(4px + 1px) rgba(255,255,255,0.06), ${difficultyShadow}`, // back to default
                ] : undefined
            } : undefined}
            exit={shouldAnimate ? { opacity: 0 } : undefined}
            transition={shouldAnimate ? {
                opacity: { duration: 0.2, ease: "easeOut" },
                boxShadow: isXs ? { duration: 0.4, ease: [0.417, 0, 0.867, 1], times: [0, 0.3, 1] } : undefined
            } : undefined}
        >
            <p
                key={selectedAnswer}
                aria-live="polite"
                className="sr-only"
            >
                {selectedAnswer ? (selectedAnswer === questionData.correct_answer ? "Correct answer selected." : "Incorrect answer selected.") : ""}
            </p>

            {/* ====== Meta ====== */}
            <GameMeta
                category={questionData.category}
                difficulty={questionData.difficulty}
                currentQuestionIndex={currentQuestionIndex}
                numOfQuestions={numOfQuestions}
            />

            {/* ====== Question ====== */}
            <h2
                className="
                        text-[clamp(1.3rem,2.5vw,1.75rem)]
                        font-bold leading-1.4 mt-6 mb-2 text-balance
                        break-words"
                id={`question-${questionData.id}`}
            >
                {insertSoftHyphens(questionData.question)}
            </h2>

            {/* ====== Answers ====== */}
            <div
                role="list"
                aria-labelledby={`question-${questionData.id}`}
                aria-describedby="answer-instruction"
                className="btn-wrapper grid md:grid-cols-2 gap-6 w-full my-4"
            >
                {renderAnswers}
            </div>

            <p id="answer-instruction" className="sr-only">
                Choose one of the answers below.
            </p>

            {/* ====== NextQuestion/ShowResults button ====== */}
            <RegularButton
                type="button"
                onClick={isLastQuestion ? handleShowResults : nextQuestion}
                disabled={!selectedAnswer}
                aria-disabled={!selectedAnswer}
                title={!selectedAnswer ? "Choose an answer to continue" : undefined}
                ref={nextButtonRef}
                className={cn(
                    "inline-flex items-center justify-center px-8 py-3 mt-4 text-white font-semibold text-[1.1rem]",
                    "rounded-[2rem] border-2 border-white/30 bg-origin-border",
                    "transition-all duration-300 ease-in-out backdrop-blur-[4px]",
                    "hover:scale-[1.03] active:scale-95 active:shadow-[0_0_8px_rgba(0,195,255,0.2)]",
                    "focus-visible:border-none outline-none will-change-transform",
                    "focus-visible:ring-2 focus-visible:ring-ring",
                    "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    {
                        "bg-[linear-gradient(135deg,rgba(0,200,120,0.8),rgba(0,160,80,0.8))] hover:shadow-[0_0_20px_rgba(0,255,180,0.3)] focus-visible:shadow-[0_0_0_4px_rgba(0,195,255,0.3)]": isLastQuestion,
                        "bg-[linear-gradient(135deg,rgba(0,195,255,0.8),rgba(214,0,186,0.8))] hover:shadow-[0_0_20px_rgba(0,195,255,0.3)] focus-visible:shadow-[0_0_0_4px_rgba(0,195,255,0.3)]": !isLastQuestion,
                        "cursor-not-allowed opacity-60 bg-white/10 scale-100 shadow-none": !selectedAnswer,
                    }
                )}
            >
                {isLastQuestion ? (
                    <>
                        Show Results <BarChart2 className="icon ml-2" size={20} />
                    </>
                ) : (
                    <>
                        Next Question <ArrowRight className="icon ml-2" size={20} />
                    </>
                )}
            </RegularButton>

            {/* ====== TriviaAddons ====== */}
            <TriviaAddons
                questionData={questionData}
                selectedAnswer={selectedAnswer}
                handleFiftyFifty={handleFiftyFifty}
                removedAnswers={removedAnswers}
            />
        </Card>
    )
}