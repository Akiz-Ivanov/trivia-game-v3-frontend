import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type TooltipProps = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  contentClassName?: string;
  triggerClassName?: string;
  arrowClassName?: string;
  side?: "top" | "right" | "bottom" | "left";
};

const TooltipWrapper = ({
  children,
  icon,
  contentClassName = "bg-gray-600/90 text-white shadow-lg drop-shadow-2xl",
  triggerClassName = "",
  arrowClassName = "",
  side = "right",
}: TooltipProps) => (
  <Tooltip>
    <TooltipTrigger asChild>
      {icon || <span className={triggerClassName}>?</span>}
    </TooltipTrigger>
    <TooltipContent className={contentClassName} arrowClassName={arrowClassName} side={side}>
      {children}
    </TooltipContent>
  </Tooltip>
);

export default TooltipWrapper;