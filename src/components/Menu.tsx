import RegularButton from "./common/RegularButton"
import Card from "@/components/common/Card"
import { useState } from "react"
import SettingsDialog from "./common/SettingsDialog"
import Attributions from "./game/results/Attributions"
import useAuth from "@/hooks/useAuth"
import LogoutAlert from "./auth/LogoutAlert"
import AuthDialog from "./auth/AuthDialog"
import MenuItem from "./MenuItem"
import ToggleSwitch from "./common/ToggleSwitch"
import { cn } from "@/lib/utils"
import { useSettings } from "@/hooks/useSettings"
import { IoRocket, IoMusicalNotes, IoFlash, IoConstruct } from "react-icons/io5"
import { RiLoginBoxLine, RiLogoutBoxLine } from "react-icons/ri"
import { GiScrollQuill, GiBookmark } from "react-icons/gi"
import { showToastSuccess } from "./common/ToastWrapper"

type MenuProps = {
  onFormStart: () => void
  toggleRadio: () => void
  isRadioOn: boolean
  handleQuickPlay: () => void
}

const Menu = ({ onFormStart, toggleRadio, isRadioOn, handleQuickPlay }: MenuProps) => {

  const [openLogin, setOpenLogin] = useState(false)
  const [openLogout, setOpenLogout] = useState(false)
  const [openSettings, setOpenSettings] = useState(false)
  const [openAbout, setOpenAbout] = useState(false)
  const [shouldAnimateRocket, setShouldAnimateRocket] = useState(false)

  const { user, logout } = useAuth()

  const { settings, setRadioTheme } = useSettings()

  const menuButtons = [
    {
      label: "Settings",
      onClick: () => setOpenSettings(true),
      icon: <IoConstruct size={20} aria-hidden="true" className="text-yellow-600" />
    },
    user ?
      {
        label: "Sign out",
        onClick: () => setOpenLogout(true),
        icon: <RiLogoutBoxLine size={20} className="text-error-foreground" aria-hidden="true" />
      }
      :
      {
        label: "Sign in",
        onClick: () => setOpenLogin(true),
        icon: <RiLoginBoxLine size={20} aria-hidden="true" className="text-green-400" />
      },
    {
      label: "About",
      onClick: () => setOpenAbout(true),
      icon: <GiBookmark size={20} aria-hidden="true" className="text-yellow-50" />
    },
  ]

  const renderMenuButtons = menuButtons.map(({ label, onClick, icon }) => (
    <RegularButton
      key={label}
      onClick={onClick}
      className="
      bg-origin-border will-change-transform
      transition-transform duration-200 ease-in-out
      focus:border-none outline-none hover:scale-[1.02]
      active:scale-95 active:shadow-[0_0_8px_rgba(0,195,255,0.2)]
      focus-visible:ring-2 focus-visible:ring-white/50
      focus-visible:ring-offset-2 focus-visible:ring-offset-background
      "
    >
      <span className="inline-flex justify-center items-center gap-1 relative">
        {icon}
        {label}
      </span>
    </RegularButton>
  ))

  const onLogoutConfirm = () => {
    logout()
    showToastSuccess("Successfully logged out")
  }

  return (
    <Card className="menu py-10 overflow-hidden">

      <h1 className="mb-4 p-0">TriviaFlair</h1>

      <MenuItem
        onMenuOpened={() => setShouldAnimateRocket(true)}
        label={
          <span className="inline-flex justify-center items-center gap-1 relative">
            <IoRocket
              size={20}
              aria-hidden="true"
              className={cn("text-chart-4 will-change-[transform,opacity]",
                "drop-shadow-[0_0_13px_var(--color-chart-4)] ",
                settings.animations && shouldAnimateRocket && "group-data-[state=open]:animate-flyoff",
                settings.animations && shouldAnimateRocket && "group-data-[state=closed]:animate-flyback"
              )}
            />

            <span>Play the Game</span>

          </span>
        }
        contentClassName="flex flex-row gap-2 justify-between"
      >
        <RegularButton
          onClick={onFormStart}
          className="purple-bg flex-1 py-2 will-change-transform border-none
            active:scale-95 active:shadow-[0_0_8px_rgba(0,195,255,0.2)]
            focus:border-none outline-none hover:scale-105
            focus-visible:ring-2 focus-visible:ring-ring
          ">
          <GiScrollQuill size={20} aria-hidden="true" className="text-chart-4" /> Customize
        </RegularButton>
        <RegularButton
          onClick={handleQuickPlay}
          className="purple-bg flex-1 py-2 will-change-transform border-none
            active:scale-95 active:shadow-[0_0_8px_rgba(0,195,255,0.2)]
            focus:border-none outline-none hover:scale-105
            focus-visible:ring-2 focus-visible:ring-ring
          ">
          <IoFlash size={20} aria-hidden="true" className="text-chart-4" /> Quick Play
        </RegularButton>
      </MenuItem>

      <MenuItem
        label={(
          <span className="inline-flex justify-center items-center gap-1 relative">
            <IoMusicalNotes
              size={20}
              aria-hidden="true"
              className="text-chart-4"
            />
            <span>Radio Widget</span>
          </span>
        )}
      >
        <div className="flex flex-col gap-4">

          <ToggleSwitch
            id="radio-toggle"
            label="Radio"
            checked={isRadioOn}
            onChange={toggleRadio}
            switchClassName={cn(
              "ring-1 ring-popover/60"
            )}
            className="gap-4 flex"
            labelClassName="text-15-16 inline-flex items-baseline justify-center"
          />

          <div className="space-y-1">
            <ToggleSwitch
              id="theme-toggle"
              label={`Theme: ${settings.radioTheme === 'retro' ? 'Retro' : 'Futuristic'}`}
              checked={settings.radioTheme === 'futuristic'}
              onChange={(checked) => setRadioTheme(checked ? 'futuristic' : 'retro')}
              switchClassName={cn(
                "ring-1 ring-popover/60 "
              )}
              className="gap-4 flex "
              labelClassName="text-15-16 "
            />
            <div className="text-xs text-muted-foreground/50 text-center">
              {settings.radioTheme === 'retro' ? 'Vintage wood & warm glow' : 'Sleek metal & blue accents'}
            </div>
          </div>
        </div>

      </MenuItem>

      {renderMenuButtons}

      <AuthDialog open={openLogin} onOpenChange={setOpenLogin} />
      <LogoutAlert open={openLogout} onOpenChange={setOpenLogout} onConfirm={onLogoutConfirm} />
      <SettingsDialog open={openSettings} onOpenChange={setOpenSettings} />
      <Attributions open={openAbout} onOpenChange={setOpenAbout} />
    </Card>
  )
}

export default Menu