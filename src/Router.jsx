import { Routes, Route } from "react-router-dom"
import DemandeDossier from "./pages/DemandeDossier"
import ListeAmi from "./pages/ListeAmi"

import ConfirmationDemandeDossier from "./pages/ConfirmationDemandeDossier"
import Signin from "./pages/Signin"
import PrivateRoutes from "./components/ProtectedRoute"
import DocumentsVisiteur from "./pages/DocumentsVisiteur"
import NotFound from "./pages/NotFound"
import Statistics from "./pages/Statistics"
import NouveauDAO from "./pages/NouveauDAO"
import ModificationDAO from "./pages/ModificationDAO"
import AjoutSuperviseur from "./pages/AjoutSuperviseur"

const Router = ()  => (
    <>
      <Routes>
        <Route 
          path="/admin"
          element={<Signin />}
        />

        <Route element={<PrivateRoutes/>}>
            <Route 
              path="/ami/page/:page"
              element={<ListeAmi />} 
            />
            <Route 
              path="/ajout/"
              element={<NouveauDAO />}
            />

            <Route 
              path="/modification_dao/:ref_ami" 
              element={<ModificationDAO />}
            />

            <Route 
              path="/superviseur/:ref_ami"
              element={<AjoutSuperviseur />} 
            />

            <Route 
              path="/statistiques/"
              element={<Statistics />} 
            />
        </Route>



        
        <Route 
          path="/dao/:ref_ami/:token" 
          element={<DocumentsVisiteur />}
        />

        <Route 
          path="/lien_de_confirmation/:ref_ami" 
          element={<ConfirmationDemandeDossier />}
        />

        <Route 
          path="/demande/:ref_ami" 
          element={<DemandeDossier />}
        />

        <Route 
          path="*"
          element={<NotFound />} 
        />
      </Routes>
    </>
)

export default Router
