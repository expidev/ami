import React from "react"
import { Routes, Route } from "react-router-dom"
import DemandeDossier from "./pages/DemandeDossier"
import AjoutDossier from "./pages/AjoutDossier"
import ListeAmi from "./pages/ListeAmi"
import ListeDocuments from "./pages/ListeDocuments"

import "./App.css"
import EmailSent from "./pages/EmailSent"
import SignInAdmin from "./pages/SignInAdmin"

const App = ()  => {

  return (
    <>
      <Routes>
        <Route 
          path="/ami"
          element={<ListeAmi />} 
        />

       <Route 
          path="/signin"
          element={<SignInAdmin />} 
        />

        <Route 
          path="/ajout/"
          element={<AjoutDossier />}
        />

        <Route 
          path="/documents" 
          element={<ListeDocuments />}
        />

        <Route 
          path="/lien_de_confirmation/:id_ami" 
          element={<EmailSent />}
        />

        <Route 
          path="/:id_ami" 
          element={<DemandeDossier />}
        />
      </Routes>
    </>
  )

}

export default App
