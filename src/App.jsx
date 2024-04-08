import "./App.css"
import AppRoute from "./AppRoute"
import ErrorBoundary from "./components/ErrorBoundary"

const App = ()  => (
    <>
      <ErrorBoundary>
       <AppRoute/>
      </ErrorBoundary>
    </>
)

export default App
