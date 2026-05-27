export interface SceneConfig {
  name: string
  mood: string
  colors: string[]
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => void
}
