import axios from 'axios'

//*====== System prompts used inside the requestPayload of axios requests ======
import {
    EXTRA_INFO_SYSTEM_PROMPT,
    HINT_SYSTEM_PROMPT
} from './aiPrompts'

//*====== Types ======
import type { RequestPayloadObject, InfoHintParams, DeepInfraChatResponse, FetchAIParams } from '@/types/aiApi.types'
import type { AxiosError } from "axios"

//*====== API URL & KEY ======//
const DEEPINFRA_API_URL: string = "https://api.deepinfra.com/v1/openai/chat/completions"
const DEEPINFRA_API_KEY: string = import.meta.env.VITE_DEEPINFRA_API_KEY

//*====== Reusable Axios Call ======//
const fetchAIResponse = async ({ prompt, systemPrompt, signal }: FetchAIParams): Promise<string> => {

    //*====== requestPayload of axios request ======
    const requestPayload: RequestPayloadObject = {
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: prompt }
        ],
        model: "meta-llama/Meta-Llama-3-8B-Instruct",
        stream: false,
        temperature: 0.7
    }

    //*====== Axios request ======
    try {
        const response = await axios.post<DeepInfraChatResponse>(
            DEEPINFRA_API_URL,
            requestPayload,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${DEEPINFRA_API_KEY}`
                },
                signal
            }
        )

        return response.data.choices[0].message.content

    //*====== Handle Error ======
    } catch (err) {
        if (axios.isCancel(err)) {
            console.log('AI request canceled')
            return "";
        }

        const axiosErr = err as AxiosError;
        console.error("DeepInfra API Error:", axiosErr.response?.data || axiosErr.message)
        return "Something went wrong. Please try again later."
    }
}

//*====== Get extra info function ======
const getExtraInfo = async ({ question, answer, category, signal }: InfoHintParams): Promise<string> => {

    //* User prompt info 
    const userPrompt: string = `Category: ${category}
Question (EXACT USER INPUT): ${question}
Answer (EXACT USER INPUT): ${answer}

Add trivia flavor and provide informative or fun context (DO NOT CORRECT, DO NOT REPEAT ANSWER OR QUESTION):`

    //* Fetch Info 
    return fetchAIResponse({ prompt: userPrompt, systemPrompt: EXTRA_INFO_SYSTEM_PROMPT, signal })
}

//*====== Get hint function ======
const getHint = async ({ question, answer, category, signal }: InfoHintParams): Promise<string> => {

    //* User prompt hint 
    const userPrompt: string = `Category: ${category}
Question (EXACT USER INPUT): ${question}
Correct Answer (EXACT USER INPUT): ${answer}

Provide one extremely brief clue to help guess the answer. Be as helpful as possible without revealing correct answer. (DO NOT CORRECT QUESTION, DO NOT REVEAL THE CORRECT ANSWER):`

    //* Fetch Hint 
    return fetchAIResponse({ prompt: userPrompt, systemPrompt: HINT_SYSTEM_PROMPT, signal })
}

export default { getExtraInfo, getHint }