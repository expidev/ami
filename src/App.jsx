import "./App.css"
import Router from "./Router"
import ErrorBoundary from "./components/ErrorBoundary"
import Navigation from "./components/Navigation"

const App = ()  => (
    <>
      <ErrorBoundary>
          <Navigation />
          <Router />
      </ErrorBoundary>
    </>
)

export default App
