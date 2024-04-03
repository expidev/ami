import { Routes, Route } from "react-router-dom"
import DemandeDossier from "./pages/DemandeDossier"
import AjoutDossier from "./components/AjoutDossier"
import ListeAmi from "./pages/ListeAmi"
import ListeDocuments from "./pages/ListeDocuments"

import EmailSent from "./pages/EmailSent"
import SigninAdmin from "./pages/SigninAdmin"
import PrivateRoutes from "./components/ProtectedRoute"
import DocumentsVisiteur from "./pages/DocumentsVisiteur"
import Superviseur from "./pages/Superviseur"

const AppRoute = ()  => (
    <>
      <Routes>
        <Route 
          path="/signin"
          element={<SigninAdmin />}
        />

        <Route element={<PrivateRoutes/>}>
            <Route 
              path="/ami"
              element={<ListeAmi />} 
            />
            <Route 
              path="/ajout/:id_ami"
              element={<AjoutDossier />}
            />

            <Route 
              path="/documents/:id_ami" 
              element={<ListeDocuments />}
            />

            <Route 
              path="/documents/" 
              element={<ListeDocuments />}
            />

            <Route 
              path="/superviseur/:id_ami"
              element={<Superviseur />} 
            />
        </Route>



        
        <Route 
          path="/dao/:id_ami/:token" 
          element={<DocumentsVisiteur />}
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

export default AppRoute
