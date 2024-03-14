import React from "react"
import { Routes, Route } from "react-router-dom"
import DemandeDossier from "./components/DemandeDossier"
import AjoutDossier from "./components/AjoutDossier"
import ListeAmi from "./components/ListeAmi"
import ListeDocuments from "./components/ListeDocuments"

const App = ()  => {

  return (
    <>
      <Routes>
        <Route 
          path="/" 
          element={<DemandeDossier />}
        />

        <Route 
          path="/ami"
          element={<ListeAmi />} 
        />

        <Route 
          path="/ajout" 
          element={<AjoutDossier />}
        />

        <Route 
          path="/documents" 
          element={<ListeDocuments />}
        />
      </Routes>
      Main App
    </>
  )

}

export default App
