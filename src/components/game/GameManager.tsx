import { useState, useEffect } from 'react'
import shuffleArray from '@/utils/shuffle'
import QuizCard from './trivia/QuizCard'
import Results from './results/Results'
import { AnimatePresence } from 'framer-motion'
import { playCorrectSound } from "@/utils/soundManager"

import type { TriviaQuestion } from '@/types/trivia-db.types'

type GameManagerProps = {
    triviaData: TriviaQuestion[],
    resetGame: () => void
}

import type { GameScreen } from '@/types/screen.types'

const GameManager = ({ triviaData, resetGame }: GameManagerProps): React.JSX.Element => {

    //* ====== Game State ======
    const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([])    // Shuffled answers for current question
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)   // Index of the current question
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)   // Selected answer by the user
    const [gameScreen, setGameScreen] = useState<GameScreen>("quiz")
    const [score, setScore] = useState<number>(0)  // Current score
    const [isMetaVisible, setIsMetaVisible] = useState<boolean>(true)

    const toggleMetaVisibility = () => setIsMetaVisible(prev => !prev)

    //* ====== Game Config ======
    const numOfQuestions: number = triviaData.length

    //* ====== Shuffle answers ======
    useEffect(() => {
        if (triviaData.length) {
            const { incorrect_answers, correct_answer } = triviaData[currentQuestionIndex]
            const answers = [...incorrect_answers, correct_answer]
            const shuffledAnswers = shuffleArray(answers)
            setShuffledAnswers(shuffledAnswers)
        }
    }, [triviaData, currentQuestionIndex])

    //* ====== Load next question ======
    const loadNextQuestion = () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setSelectedAnswer(null)
    }

    //* ====== Process the selected answer (correct or incorrect) ======
    const processAnswerSelection = (answer: string, isCorrect: boolean) => {
        if (selectedAnswer) return
        setSelectedAnswer(answer)
        if (isCorrect) {
            setScore(prev => prev + 1)
            playCorrectSound()
        }
    }

    //* ====== Handle game end ======
    const handleShowResults = () => {
        setGameScreen("results")
    }

    return (
        <>
            {gameScreen === "quiz" && (
                <AnimatePresence mode='wait'>
                    <QuizCard
                        key={triviaData[currentQuestionIndex].id}
                        questionData={triviaData[currentQuestionIndex]}
                        answers={shuffledAnswers}
                        isLastQuestion={currentQuestionIndex === triviaData.length - 1}
                        selectedAnswer={selectedAnswer}
                        processAnswerSelection={processAnswerSelection}
                        nextQuestion={loadNextQuestion}
                        currentQuestionIndex={currentQuestionIndex}
                        numOfQuestions={numOfQuestions}
                        handleShowResults={handleShowResults}
                        isMetaVisible={isMetaVisible}
                        toggleMetaVisibility={toggleMetaVisibility}
                    />
                </AnimatePresence>
            )}

            {gameScreen === "results" && (
                <Results
                    score={score}
                    numOfQuestions={numOfQuestions}
                    resetGame={resetGame}
                />
            )}
        </>
    )
}

export default GameManager