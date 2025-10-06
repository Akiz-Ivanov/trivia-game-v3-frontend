type ProgressBarProps = {
    value: number
}

const ProgressBar = ({ value }: ProgressBarProps) => {
    return (
        <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(value)}
            className="w-[90%] m-auto bg-gray-400/30 rounded-full overflow-hidden"
        >
            <div
                className="h-2 bg-gradient-to-r from-accent to-chart-2 
                           transition-[width] duration-400 ease-out"
                style={{
                    width: `${value}%`,
                }}
            />
        </div>
    )
}

export default ProgressBar