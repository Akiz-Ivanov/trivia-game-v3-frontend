import { useEffect, useRef } from "react"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

const InfoPanelAI = ({ content, open }: { content: string, open: boolean }) => {

    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!ref.current || !open) return;

        const timeout = setTimeout(() => {
            ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
            ref.current?.focus()
        }, 250)

        return () => clearTimeout(timeout)
    }, [open])

    // Don't render at all when not open
    // if (!open) return null

    // The reason why it wasn't working is because of if (!open) return null and collapsible and // value="ai-panel" // Always open when rendered
    // Mainly because of trying to make accordion not focusable when closed

    return (
        <Accordion
            type="single"
            aria-hidden={!open}
            collapsible value={open ? "ai-panel" : ""}
            // value="ai-panel" // Always open when rendered
            className="w-full purple-bg rounded-aicard mt-2"
        >
            <AccordionItem value="ai-panel">
                <AccordionTrigger className="sr-only">
                    Hint/Info Panel
                </AccordionTrigger>
                <AccordionContent
                    ref={ref}
                    tabIndex={-1}
                    className="text-sm px-5 py-2.5 pb-4
                    animate-in fade-in slide-in-from-top-2
                    whitespace-pre-wrap"
                >
                    {content}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

export default InfoPanelAI