export type TriviaAPI = {
    response_code: number
    results: QuestionData[]
}

export type QuestionData = {
    category: string
    correct_answer: string
    difficulty: "easy" | "medium" | "hard"
    incorrect_answers: string[]
    question: string
    type: "multiple" | "boolean"
}

export interface TriviaQuestion extends QuestionData {
    id: string
    question: string
    correct_answer: string
    incorrect_answers: string[]
    category: string
}