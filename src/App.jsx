import React from "react"
import { Routes, Route } from "react-router-dom"
import DemandeDossier from "./pages/DemandeDossier"
import AjoutDossier from "./pages/AjoutDossier"
import ListeAmi from "./pages/ListeAmi"
import ListeDocuments from "./pages/ListeDocuments"

import "./App.css"

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
    </>
  )

}

export default App
