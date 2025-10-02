import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { useEffect, useRef, useState } from "react"
import { ChevronUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

type MenuItemProps = {
  label: React.ReactNode
  children: React.ReactNode
  onClick?: () => void
  className?: string
  onMenuOpened?: () => void
  triggerClassName?: string
  contentClassName?: string
  closeButtonClassName?: string
}

const MenuItem = ({
  label,
  children,
  className,
  onMenuOpened,
  triggerClassName,
  contentClassName,
  closeButtonClassName
}: MenuItemProps) => {

  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLDivElement>(null)

  // Auto-focus the close button when opening
  useEffect(() => {
    if (open && closeButtonRef.current) {
      closeButtonRef.current.focus()
    }
  }, [open])

  return (
    <Collapsible
      open={open}
      onOpenChange={() => {
        setOpen(!open)
        onMenuOpened?.()
      }}
      className="w-full max-w-2xs lg:max-w-xs mb-1"
    >
      <div className={cn(`
        menu-collapsible rounded-xl will-change-transform
        transition-all duration-300 ease-in-out
        shadow-[inset_0_0_0_0.1rem_#ffffff44,_0_0_15px_rgba(0,195,255,0.4)]
        ${open ? 'p-0' : 'hover:scale-[1.02] hover:shadow-[inset_0_0_0_0.1rem_#ffffff44,_0_0_15px_rgba(0,195,255,0.4)]'}
      `, className)}
      >
        <CollapsibleTrigger asChild className={cn("rounded-xl", triggerClassName)}>
          <button
            tabIndex={open ? -1 : 0}
            className={cn(`
              w-full p-4 text-16-18 group
              flex items-center justify-center gap-2
              bg-origin-border will-change-transform
              transition-transform duration-200 ease-in-out
              active:scale-95 active:shadow-[0_0_8px_rgba(0,195,255,0.2)]
              focus:border-none outline-none
              focus-visible:ring-2 focus-visible:ring-white/50
              focus-visible:ring-offset-2 focus-visible:ring-offset-background
              ${open ? 'rounded-b-none' : ''}
            `, triggerClassName)}
          >
            {label}

            <div className="absolute right-4">
              {open && (
                <div
                  ref={closeButtonRef}
                  tabIndex={0}
                  role="button"
                  aria-label={`Collapse menu`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setOpen(false)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      e.stopPropagation()
                      setOpen(false)
                    }
                  }}
                  className={cn(`
                    p-1 rounded-md outline-none cursor-pointer
                    focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background
                    hover:bg-white/10 transition-colors
                  `, closeButtonClassName)}
                >
                  <ChevronUp size={20} />
                </div>
              )}
            </div>
          </button>
        </CollapsibleTrigger>

        <AnimatePresence>
          {open && (
            <CollapsibleContent asChild forceMount>
              <motion.div
                ref={ref}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{
                  height: 0,
                  opacity: 0,
                  transition: {
                    opacity: { duration: 0.15, ease: "easeOut" },
                    height: { duration: 0.3, ease: "easeInOut" }
                  }
                }}
                transition={{
                  height: { duration: 0.3, ease: "easeInOut" },
                  opacity: { duration: 0.2, ease: "easeOut", delay: 0.15 }
                }}
                className="border-t border-1.5 border-[#3d4ba6] max-w-[85%] mx-auto"
                aria-hidden={!open}
              >
                <div
                  className={cn("py-4 w-full", contentClassName)}
                >
                  {children}
                </div>
              </motion.div>
            </CollapsibleContent>
          )}
        </AnimatePresence>
      </div>
    </Collapsible>
  )
}

export default MenuItem