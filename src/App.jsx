import React from "react"
import { Routes, Route } from "react-router-dom"
import DemandeDossier from "./pages/DemandeDossier"
import AjoutDossier from "./pages/AjoutDossier"
import ListeAmi from "./pages/ListeAmi"
import ListeDocuments from "./pages/ListeDocuments"

import "./App.css"
import EmailSent from "./pages/EmailSent"
import SignInAdmin from "./pages/SignInAdmin"
import PrivateRoutes from "./components/ProtectedRoute"

const App = ()  => {

  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes/>}>
            <Route 
              path="/ami"
              element={<ListeAmi />} 
            />
            <Route 
              path="/ajout/:id_ami"
              element={<AjoutDossier />}
            />
        </Route>

       <Route 
          path="/signin"
          element={<SignInAdmin />} 
        />

        <Route 
          path="/documents/:id_ami" 
          element={<ListeDocuments />}
        />

        <Route 
          path="/lien_de_confirmation/:id_ami" 
          element={<EmailSent />}
        />

        <Route 
          path="/demande/:id_ami" 
          element={<DemandeDossier />}
        />
      </Routes>
    </>
  )

}

export default App
