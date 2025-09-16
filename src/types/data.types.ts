type Amount = {
    value: string
}

type Category = {
    name: string
    value: string
}

type DifficultyValue = "easy" | "medium" | "hard"

type Difficulty = {
    name: Capitalize<DifficultyValue>
    value: DifficultyValue
}

export type Data = {
    amount: Amount[]
    category: Category[]
    difficulty: Difficulty[]
}