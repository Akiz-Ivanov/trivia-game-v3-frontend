import { useState, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { preloadAllCategoryImages } from '@/assets/imports'
import triviadbApi from './services/triviadbApi'
import GameForm from "./components/game-form/GameForm"
import GameManager from './components/game/GameManager'
import ErrorScreen from './components/common/ErrorScreen'
import Menu from './components/Menu'
import SettingsDialog from './components/common/SettingsDialog'
import ReturnToMenu from './components/common/ReturnToMenu'
import { useSettings } from "@/hooks/useSettings"
import { useSoundManager } from './hooks/useSoundManager'
import useHoverDetection from './hooks/useHoverDetection'
import { Toaster } from "@/components/ui/sonner"
import RadioWidget from './components/radio/RadioWidget'
import { RadioProvider } from './context/RadioProvider'
import useLocalStorageState from './hooks/useLocalStorageState'
import { showToastInfo } from './components/common/ToastWrapper'
import { SparklesCore } from "@/components/ui/sparkles"

//* ====== Types ======
import type { TriviaQuestion } from './types/trivia-db.types'
import type { GameFormData } from "./types/game-form.types"
import type { Screen } from './types/screen.types'
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi'

function App(): React.JSX.Element {

  //* Static value for the initial form data
  const initialFormData: GameFormData = {
    amount: "10",
    category: "Any",
    difficulty: "Any"
  }

  //* ====== Form State ======
  const [formData, setFormData] = useLocalStorageState<GameFormData>(
    "triviaFormData",
    initialFormData
  )   // Stores quiz config: amount, category, difficulty

  //* ====== Trivia Game State ======
  const [triviaData, setTriviaData] = useState<TriviaQuestion[]>([])  // Fetched trivia questions

  //* ====== UI & Flow State ======
  const [screen, setScreen] = useState<Screen>("menu")
  const [isRadioOn, setIsRadioOn] = useLocalStorageState<boolean>("isRadioOn", true)
  const [isRadioOpen, setIsRadioOpen] = useState<boolean>(false)

  //* ====== Function to handle form data changes ======
  const handleChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }))
  }

  //* ====== Start the game function ======
  const startGame = async (): Promise<void> => {
    setScreen("loading")

    try {
      const { amount, category, difficulty } = formData

      //* Fetch trivia data
      const triviaData = await triviadbApi.fetchTriviaData(amount, category, difficulty)

      if (!triviaData || triviaData.length === 0) {
        setScreen("error")
        return
      }

      //* Preload all category images
      await preloadAllCategoryImages()

      //* Set trivia data and start game
      setTriviaData(triviaData)
      setScreen("game")

    } catch (err) {
      console.error("Trivia fetch error:", err)
      setScreen("error")
    }
  }

  //*====== Form Submit (Starts Game) ======
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await startGame()
  }

  //*====== Menu ======
  const handleFormStart = () => {
    setScreen("form")
  }

  //*====== Reset the game ======
  const resetGame = () => {
    setTriviaData([])
    setScreen("menu")
  }

  const { settings } = useSettings()

  //* ====== Apply minimal mode ====== 
  useEffect(() => {
    document.body.classList.toggle('minimal-mode-animations', !settings.animations || !settings.backgroundPattern)
    document.body.classList.toggle('minimal-mode-illustrations', !settings.illustrations || !settings.backgroundPattern)
  }, [settings])

  //*====== Apply hover ======
  useHoverDetection()

  //* ====== Apply sound ======
  useSoundManager(settings.sound)

  const handleReturnToMenu = () => {
    setScreen("menu")
    setTriviaData([])
  }

  return (
    <>
      {settings.sparkles && (
        <div className="w-full absolute inset-0 h-screen pointer-events-none">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={1}
            maxSize={2}
            particleDensity={8}
            className="w-full h-full"
            particleColor="#1693f1"
          />
        </div>
      )}
      <main className='w-full h-fit xs:px-16-128 xs:py-8 overflow-x-hidden'>
        <div className='flex flex-col items-center justify-center w-full max-w-[30rem] xs:max-w-[37.5rem]'>
          <Toaster
            position="bottom-center"
          />
          {screen === "game" || screen === "form" ?
            <ReturnToMenu
              onReturnToMenu={handleReturnToMenu}
            /> : null
          }
          {screen !== "menu" && <SettingsDialog />}
          <ErrorBoundary FallbackComponent={ErrorScreen} onReset={resetGame}>
            {screen === "loading" && (
              <div className='text-chart-4 flex flex-col gap-2 items-center justify-center'>
                <GiPerspectiveDiceSixFacesRandom size={60} aria-hidden="true" className="animate-dice-spinning" />
                <h2 className='tracking-wide'>Loading...</h2>
              </div>
            )}
            {screen === "error" && (
              <ErrorScreen resetErrorBoundary={() => setScreen("form")} />
            )}
            {screen === "menu" && (
              <Menu
                onFormStart={handleFormStart}
                toggleRadio={() => setIsRadioOn(prev => !prev)}
                isRadioOn={isRadioOn}
                handleQuickPlay={startGame}
              />
            )}
            {screen === "form" && (
              <GameForm
                formData={formData}
                onSubmit={handleFormSubmit}
                onChange={handleChange}
              />
            )}
            {screen === "game" && (
              <GameManager
                triviaData={triviaData}
                resetGame={resetGame}
              />
            )}
            {isRadioOn && (
              <RadioProvider>
                <RadioWidget
                  isRadioOpen={isRadioOpen}
                  handleRadioOpen={() => setIsRadioOpen(true)}
                  handleRadioClose={() => setIsRadioOpen(false)}
                  powerOff={() => {
                    setIsRadioOn(false)
                    showToastInfo("Radio turned off! You can turn it back on in the menu.")
                  }}
                />
              </RadioProvider>
            )}
          </ErrorBoundary>
        </div>
      </main>
    </>
  )
}

export default App