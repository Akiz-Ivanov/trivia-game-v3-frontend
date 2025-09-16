import { useEffect, useState } from "react"
import RegularButton from "./RegularButton"
import { ArrowBigLeft, Home } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

type ReturnToMenuProps = {
  onReturnToMenu: () => void
}

const ReturnToMenu = ({ onReturnToMenu }: ReturnToMenuProps) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)")
    setIsMobile(mq.matches)

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener("change", handler)

    return () => mq.removeEventListener("change", handler)
  }, [])

  return isMobile ? (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <RegularButton
          className="absolute top-2 left-2 z-50 bg-transparent"

          title="Return to menu"
        >
          <Home className="text-chart-3/80" />
        </RegularButton>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to return to the menu?</AlertDialogTitle>
          <AlertDialogDescription>
            This will exit your current game.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-column justify-center gap-4 w-2/3 mx-auto">
          <AlertDialogCancel asChild>
            <Button variant="outline" className="py-3 px-4 hover:bg-chart-5">Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction onClick={onReturnToMenu} asChild>
            <Button variant="destructive" className="py-3 px-4 bg-destructive hover:bg-destructive/70">Return to menu</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
    : (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <RegularButton
            className="absolute top-2 left-2 z-50 rounded-[1rem] hover:rounded-[0.5rem] px-2 py-1 flex gap-1 bg-popover border-2 border-border/50 hover:border-border hover:bg-accent/50 transition-all duration-300 group"
            title="Return to menu"
          >
            <ArrowBigLeft className="rounded-full size-5 bg-muted/50 duration-300
              group-hover:bg-chart-3 group-hover:text-black transition-all
              group-focus-visible:bg-chart-3 group-focus-visible:text-black"
            />
            Menu
          </RegularButton>
        </AlertDialogTrigger>
        <AlertDialogContent className="py-8">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center flex flex-col justify-center">Are you sure you want to return to the menu?</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              This will exit your current game.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-row justify-center gap-4 mx-auto">
            <AlertDialogCancel asChild>
              <Button variant="outline" className="py-2 px-4 hover:bg-chart-5">Cancel</Button>
            </AlertDialogCancel>
            <AlertDialogAction onClick={onReturnToMenu} asChild>
              <Button variant="destructive" className="py-2 px-4 bg-destructive hover:bg-destructive/70">Return to menu</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
}

export default ReturnToMenu