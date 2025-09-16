export type RequestPayloadObject = {
    messages: {
        role: string;
        content: string;
    }[];
    model: string;
    stream: boolean;
    temperature: number;
}

export type InfoHintParams = {
    question: string
    answer: string
    category: string
    signal: AbortSignal
}


export type DeepInfraChatResponse = {
    choices: {
        message: {
            content: string;
        };
    }[];
};

export type FetchAIParams = {
    prompt: string
    systemPrompt: string
    signal?: AbortSignal
}