import ProgressBar from "../../common/ProgressBar"

type GameMetaProps = {
    numOfQuestions: number
    currentQuestionIndex: number
    category: string
    difficulty: "easy" | "medium" | "hard"
}

const GameMeta = ({ numOfQuestions, currentQuestionIndex, category, difficulty }: GameMetaProps): React.JSX.Element => {
    return (
        <aside 
            className="game-card__meta flex flex-col items-center justify-center w-full italic gap-2"
            aria-label="Game progress and metadata"
        >
            {/* ====== Progress bar ====== */}
            <ProgressBar value={((currentQuestionIndex + 1) / numOfQuestions) * 100} />

            {/* ====== Question number & difficulty ====== */}
            <span className="capitalize">Question {currentQuestionIndex + 1} / {numOfQuestions} • {difficulty}</span>

            {/* ====== Category ====== */}
            <p className="game-category order-first">{category}</p>
        </aside>
    )
}

export default GameMeta