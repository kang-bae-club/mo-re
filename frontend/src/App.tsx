import { HomePage } from './pages/home/ui/Page'
import { MockInitializer } from './app/MockInitializer'

const App = () => {
    return (
        <>
            <MockInitializer />
            <HomePage />
        </>
    )
}

export default App
