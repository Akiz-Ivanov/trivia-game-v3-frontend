import ExternalLink from "@/components/common/ExternalLink"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog"

type AttributionsProps = {
    open?: boolean
    onOpenChange?: (open: boolean) => void
}

const Attributions = ({ open, onOpenChange }: AttributionsProps) => {

    const storysetCategories = [
        "people", "online", "home", "music", "play", "leisure", "nature", "computer",
        "education", "work", "sport", "social-media", "business", "technology", "web",
        "happy", "animal"
    ]

    const storysetLinks = storysetCategories.map(category => {
        return (
            <li key={category}>
                <ExternalLink href={`https://storyset.com/${category}`}>
                    {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()} illustrations by Storyset
                </ExternalLink>
            </li>
        )
    })

    const isControlled = open !== undefined && onOpenChange !== undefined

    return (

        <Dialog open={open} onOpenChange={onOpenChange}>
            {!isControlled && (
                <DialogTrigger asChild>
                    <button
                        type="button"
                        aria-label="Open credits"
                        className="text-chart-3 text-sm hover:underline"
                    >
                        Credits
                    </button>
                </DialogTrigger>
            )}
            <DialogContent className="flex flex-col gap-4 max-h-[95vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-center text-18-22">
                        Attributions & Sources
                    </DialogTitle>
                </DialogHeader>
                <section>
                    <h2 className="text-center">Made Possible By</h2>
                    <ul className="text-left list-inside text-sm 
                    grid grid-cols-2 gap-4 w-full">
                        <li className="text-center text-chart-3">
                            <ExternalLink href="https://lucide.dev/" >
                                Icons from Lucide
                            </ExternalLink>
                            <ExternalLink href="https://lucide.dev/">
                                <img src="https://cdn.brandfetch.io/idPQNFbdhC/theme/light/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B" alt="Lucide Logo" className="w-17 hover:scale-105 transition-transform duration-300 ease-in-out mx-auto mt-3 will-change-transform"
                                />
                            </ExternalLink>
                        </li>
                        <li className="text-center w-full">
                            <ExternalLink href="https://opentdb.com" className="text-chart-3">
                                Questions from OpenTriviaDB
                            </ExternalLink>
                            <ExternalLink href="https://opentbd.com" className="underline mx-auto align-center">
                                <img src="https://cdn.brandfetch.io/idZrEt7cUQ/w/816/h/376/theme/light/logo.png?c=1dxbfHSJFAPEGdCLU4o5B" alt="Open Trivia DB Logo" className="w-30 hover:scale-105 transition-transform duration-300 ease-in-out mx-auto mt-3 will-change-transform"
                                />
                            </ExternalLink>
                        </li>
                    </ul>
                </section>

                <section className="space-y-2">
                    <h2 className="sr-only">Radio Data</h2>
                    <div className="w-full flex flex-row justify-center items-center gap-6 mt-4">
                        <ExternalLink href="https://gitlab.com/radiobrowser/radiobrowser-api-rust"
                            title="Radio Browser GitLab Repository">
                            <img src="https://about.gitlab.com/images/press/logo/png/gitlab-icon-rgb.png"
                                alt="GitLab logo"
                                className="size-12 hover:scale-105 transition-transform duration-300 ease-in-out" />
                        </ExternalLink>
                        <div className="text-center">
                            <ExternalLink href="https://api.radio-browser.info/" className="text-chart-3">
                                📻 Radio Browser API
                            </ExternalLink>
                            <p className="text-xs text-gray-500 mt-1">30,000+ stations</p>
                        </div>
                        <ExternalLink href="https://github.com/segler-alex/radiobrowser-api-rust"
                            title="Radio Browser GitHub repository">
                            <img src="https://github.githubassets.com/favicons/favicon-dark.png"
                                alt="GitHub logo"
                                className="size-8 hover:scale-105 transition-transform duration-300 ease-in-out" />
                        </ExternalLink>
                    </div>
                </section>

                <section className="space-y-2">
                    <h2>
                        - Game Illustrations and Vectors
                    </h2>

                    <ul className="text-sm">

                        {storysetLinks}

                        <li>
                            <ExternalLink href="https://www.vecteezy.com/free-vector/ocean">
                                Ocean Vectors by Vecteezy
                            </ExternalLink>
                        </li>
                        <li>
                            <ExternalLink href="https://www.vecteezy.com/free-vector/mcqueen">
                                Mcqueen Vectors by Vecteezy
                            </ExternalLink>
                        </li>
                        <li>
                            <ExternalLink href="https://www.freepik.com/free-vector/olympian-gods-flat-colored-composition-gods-standing-natural-landscape-against-background-mountains-forests-water-vector-illustration_38754454.htm#fromView=keyword&page=1&position=2&uuid=af984101-90ac-41c8-b58f-3df7996e3e85&query=Mythology+Olympus+Illustration">
                                Image by macrovector on Freepik
                            </ExternalLink>
                        </li>
                        <li>
                            <ExternalLink href="https://www.freepik.com/free-vector/radio-devices-set_4445060.htm">
                                Radio devices set by pch.vector - Freepik
                            </ExternalLink>
                        </li>
                    </ul>
                    <aside className="w-full flex flex-row justify-between items-center gap-4 mt-4">

                        <ExternalLink href="https://storyset.com/" title="Illustrations provided by Storyset">
                            <img src="https://cdn.brandfetch.io/idM503QeTh/theme/light/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B" alt="Storyset logo." className="w-34 hover:scale-105 transition-transform duration-300 ease-in-out" />
                        </ExternalLink>

                        <ExternalLink href="https://vecteezy.com/" title="Illustrations provided by Vecteezy">
                            <img src="https://cdn.brandfetch.io/idfGEiSEhT/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B" alt="Vecteezy logo." className="w-34 hover:scale-105 transition-transform duration-300 ease-in-out invert brightness-[2.2]" />
                        </ExternalLink>

                        <ExternalLink href="https://www.freepik.com/" title="Illustrations provided by Freepik">
                            <img src="https://cdn.brandfetch.io/id6KQUPKmw/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B" alt="Freepik logo." className="w-34 hover:scale-105 transition-transform duration-300 ease-in-out" />
                        </ExternalLink>

                    </aside>
                </section>
                <section>
                    <h2>
                        - Audio
                    </h2>
                    <ul>
                        <li>
                            <ExternalLink href="https://freesound.org/people/oggraphics/sounds/610703/">
                                "Good answer harp glissando.wav"
                            </ExternalLink>
                        </li>
                    </ul>
                </section>
                <DialogDescription className="text-center italic">
                    This game was created by <a href="https://github.com/Akiz-Ivanov" target="_blank" className="underline">Akiz</a>
                </DialogDescription>
            </DialogContent>
        </Dialog >
    )
}

export default Attributions