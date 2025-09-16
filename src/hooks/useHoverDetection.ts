import { useEffect } from "react"

const useHoverDetection = () => {
    useEffect(() => { 
        const supportsHover = window.matchMedia('(hover: hover)').matches;
        if (supportsHover) {
            document.body.classList.add('hover-supported');
        }
    }, [])
}

export default useHoverDetection