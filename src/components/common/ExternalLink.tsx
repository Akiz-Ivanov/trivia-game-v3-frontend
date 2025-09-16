import { cn } from "@/lib/utils"

type ExternalLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>

const ExternalLink = ({ children, className, ...props }: ExternalLinkProps) => {
    return (
        <a
            target="_blank"
            rel="noopener noreferrer"
            className={cn("hover:underline", className)}
            {...props}
        >
            {children}
        </a>
    )
}

export default ExternalLink