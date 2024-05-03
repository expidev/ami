import "./App.css"
import AppRoute from "./AppRoute"
import ErrorBoundary from "./components/ErrorBoundary"
import Navigation from "./components/Navigation"

const App = ()  => (
    <>
      <ErrorBoundary>
          <Navigation />
          <AppRoute/>
      </ErrorBoundary>
    </>
)

export default App
