import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

// main.tsx에서 react root element를 생성하기 이전에 node.env.NODE_ENV가 dev인 경우에만 동작하도록 설정
export const worker = setupWorker(...handlers)
