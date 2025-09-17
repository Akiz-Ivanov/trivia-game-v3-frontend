import RegularButton from "./common/RegularButton"
import Card from "@/components/common/Card"
import { useState } from "react"
import SettingsDialog from "./common/SettingsDialog"
import Attributions from "./game/results/Attributions"
import useAuth from "@/hooks/useAuth"
import LogoutAlert from "./auth/LogoutAlert"
import AuthDialog from "./auth/AuthDialog"
import { toast } from "sonner"

type MenuProps = {
  onFormStart: () => void
  toggleRadio: () => void
  isRadioOn: boolean
}

const Menu = ({ onFormStart, toggleRadio, isRadioOn }: MenuProps) => {

  const [openLogin, setOpenLogin] = useState(false)
  const [openLogout, setOpenLogout] = useState(false)
  const [openSettings, setOpenSettings] = useState(false)
  const [openAbout, setOpenAbout] = useState(false)

  const { user, logout } = useAuth()

  const menuItems = [
    { label: "Play the Game", onClick: onFormStart },
    user
      ? { label: "Logout", onClick:() => setOpenLogout(true) }
      : { label: "Login", onClick: () => setOpenLogin(true) },
      { label: isRadioOn ? "Turn Radio Off" : "Turn Radio On", onClick: toggleRadio },
    { label: "Settings", onClick: () => setOpenSettings(true) },
    { label: "About", onClick: () => setOpenAbout(true) },
  ]

  const renderMenuItems = menuItems.map(({ label, onClick }) => (
    <RegularButton
      key={label}
      onClick={onClick}
      className="
        bg-origin-border will-change-transform
        transition-transform duration-200 ease-in-out
        hover:scale-[1.02]
        active:scale-95 active:shadow-[0_0_8px_rgba(0,195,255,0.2)]
        focus:border-none outline-none
        focus-visible:ring-2 focus-visible:ring-white/50
        focus-visible:ring-offset-2 focus-visible:ring-offset-background
        "
    >
      {label}
    </RegularButton>
  ))

  const onLogoutConfirm = () => {
    logout()
    toast.success(
      <div className="flex items-center gap-2">
        <span className="font-bold">Successfully logged out</span>
      </div>, {
      style: {
        fontWeight: 700,
        fontSize: "1rem",
        border: "2px solid var(--chart-3)"
      },
    })
  }

  return (
    <Card className="menu py-10">
      <h1 className="mb-4 p-0">TriviaFlair</h1>
      {renderMenuItems}

      <AuthDialog open={openLogin} onOpenChange={setOpenLogin} />
      <LogoutAlert open={openLogout} onOpenChange={setOpenLogout} onConfirm={onLogoutConfirm} />
      <SettingsDialog open={openSettings} onOpenChange={setOpenSettings} />
      <Attributions open={openAbout} onOpenChange={setOpenAbout} />
    </Card>
  )
}

export default Menu