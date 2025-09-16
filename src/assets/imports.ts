import type { Category, SvgModule } from "../types/imports.types"


//* Load category-specific SVG background
const categoryLoaders: Record<Category, () => Promise<SvgModule>> = {
    "Geography": () => import("./svgs/geography.svg"),
    "Science: Gadgets": () => import("./svgs/science-gadgets.svg"),
    "General Knowledge": () => import("./svgs/general-knowledge.svg"),
    "Entertainment: Film": () => import("./svgs/entertainment-film.svg"),
    "Entertainment: Music": () => import("./svgs/entertainment-music.svg"),
    "Entertainment: Musicals & Theatres": () => import("./svgs/entertainment-musicals-theatres.svg"),
    "Entertainment: Television": () => import("./svgs/entertainment-television.svg"),
    "Entertainment: Video Games": () => import("./svgs/entertainment-video-games.svg"),
    "Entertainment: Board Games": () => import("./svgs/entertainment-board-games.svg"),
    "Science & Nature": () => import("./svgs/science-nature.svg"),
    "Science: Computers": () => import("./svgs/science-computers.svg"),
    "Science: Mathematics": () => import("./svgs/science-mathematics.svg"),
    "Mythology": () => import("./svgs/mythology.svg"),
    "Sports": () => import("./svgs/sports.svg"),
    "History": () => import("./svgs/history.svg"),
    "Politics": () => import("./svgs/politics.svg"),
    "Art": () => import("./svgs/art.svg"),
    "Celebrities": () => import("./svgs/celebrities.svg"),
    "Animals": () => import("./svgs/animals.svg"),
    "Vehicles": () => import("./svgs/vehicles.svg"),
    "Entertainment: Comics": () => import("./svgs/entertainment-comics.svg"),
    "Entertainment: Japanese Anime & Manga": () => import("./svgs/anime.svg"),
    "Entertainment: Books": () => import("./svgs/books.svg"),
    "Entertainment: Cartoon & Animations": () => import("./svgs/cartoon.svg"),
}

const preloadedImages = new Map<Category, string>()

//* ====== Preload all category images ======
export async function preloadAllCategoryImages() {
    const entries = Object.entries(categoryLoaders) as [Category, () => Promise<SvgModule>][]
    await Promise.all(
        entries.map(async ([category, loader]) => {
            const module = await loader()
            const url = module.default

            const img = new Image()
            img.src = url

            preloadedImages.set(category, url)
        })
    )
}

//* ====== Get a preloaded image (url) via: ======
export function getPreloadedCategoryBg(category: Category): string | null {
    return preloadedImages.get(category) ?? null
}