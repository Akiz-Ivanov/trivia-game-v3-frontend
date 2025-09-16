import { decode } from 'html-entities'
import axios from 'axios'
import { nanoid } from 'nanoid'

import type { TriviaQuestion, QuestionData, TriviaAPI } from '../types/trivia-db.types'

let sessionToken: string | null = null

//* ====== Get new session token ======
const getNewSessionToken = async (): Promise<string | null> => {
    try {
        const response = await axios.get('https://opentdb.com/api_token.php?command=request')
        sessionToken = response.data.token
        return sessionToken
    } catch (error) {
        console.error('Failed to get token:', error)
        throw error
    }
}

// export const resetTriviaToken = () => {
//     sessionToken = null
// }

//* ====== Fetch trivia data from API ======
const fetchTriviaData = async (
    amount: string,
    category: string,
    difficulty: "easy" | "medium" | "hard" | "Any"
): Promise<TriviaQuestion[] | undefined> => {

    if (!sessionToken) {
        await getNewSessionToken()
    }

    const params: Record<string, string> = {
        amount,
        token: sessionToken as string
    }
    
    if (category !== "Any") params.category = category
    if (difficulty !== "Any") params.difficulty = difficulty

    try {
        const response = await axios.get<TriviaAPI>('https://opentdb.com/api.php', { params })

        const { response_code, results } = response.data

        //* Token empty / expired → get new one and retry once
        if (response_code === 4) {
            await getNewSessionToken()
            return fetchTriviaData(amount, category, difficulty)
        }

        //* API Error
        if (response_code !== 0) {
            throw new Error(`API Error ${response_code}`);
        }

        //* Success
        return results.map((questionData: QuestionData): TriviaQuestion => ({
            ...questionData,
            question: decode(questionData.question),
            correct_answer: decode(questionData.correct_answer),
            incorrect_answers: questionData.incorrect_answers.map((answer: string) => decode(answer)),
            category: decode(questionData.category),
            id: nanoid()
        }))

    } catch (error) {
        console.error('Error fetching trivia data:', error)
    }
}

export default { fetchTriviaData }