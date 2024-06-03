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
import NotFound from "./pages/NotFound"
import Statistics from "./pages/Statistics"

const AppRoute = ()  => (
    <>
      <Routes>
        <Route 
          path="/admin"
          element={<SigninAdmin />}
        />

        <Route element={<PrivateRoutes/>}>
            <Route 
              path="/ami/:page"
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

            <Route 
              path="/statistics/"
              element={<Statistics />} 
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

        <Route 
          path="*"
          element={<NotFound />} 
        />
      </Routes>
    </>
)

export default AppRoute
