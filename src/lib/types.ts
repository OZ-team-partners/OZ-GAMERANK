import { EmotionCache } from "@emotion/react"

export interface Diary {
    id: string
    content: string
    date :string
    emotion :Emotion
    createAT: string
    updateAT :string
}

export type Emotion = '행복' 

