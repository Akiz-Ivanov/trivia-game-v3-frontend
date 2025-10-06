export type GameFormData = {
    amount: string
    category: string
    difficulty: "easy" | "medium" | "hard" | "Any"
}

export type GameFormProps = {
    formData: GameFormData
    onSubmit: React.FormEventHandler<HTMLFormElement>
    onChange: (key: string, value: string) => void
}