import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginPage from './components/pages/login';
import ForgetPasswordPage from './components/pages/forgotpassword';
import HomePage from './components/pages/home';
import CodePage from './components/pages/code';
import ResetPage from './components/pages/reset';
import InterfaceEmployé from './components/interfaceEmployé.js';
import Emploidutemps from './components/pages/emploidutemps.js'; 
import DemandeDeCongé from './components/pages/demandedecongé.js'; 
import ListeDesCongés from './components/pages/listedescongés.js'
import Formations from './components/pages/formations.js'; 
import Profile from './components/pages/profile.js';
import EditProfile from './components/pages/editProfile.js';
import InterfaceRH from './components/interfaceRH.js';
import Gereremploidutemps from './components/pages/gereremploidutemps.js'; 
import Ajoutempdutemps from './components/pages/ajoutempdutemps.js'
import Modificationempdutemps from './components/pages/modificationempdutemps.js'
import Gererlesconges from './components/pages/gererlesconges.js'
import Gererlesformations from './components/pages/gererlesformations.js'; 
import Ajouterformation from './components/pages/ajouterformation.js';
import Modifierformation from './components/pages/modifierformation.js';
import ProfileRH from './components/pages/profileRH.js';
import EditProfileRH from './components/pages/editprofileRH.js';



 export default function App(){
    return(
        <Router>
        <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forget-password" element={<ForgetPasswordPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/code" element={<CodePage />} />
            <Route path="/reset" element={<ResetPage />} />
            <Route path="/interfaceEmp" element={<InterfaceEmployé />} />
            <Route path="/emploidutemps" element={<Emploidutemps />} />
            <Route path="/demandedecongé" element={<DemandeDeCongé />} /> 
            <Route path="/listedescongés" element={<ListeDesCongés />} /> 
            <Route path="/formations" element={<Formations />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/editProfile/:id" element={<EditProfile />} />
           <Route path="/InterfaceRH" element={<InterfaceRH />} />
            <Route path="/Gereremploidutemps" element={<Gereremploidutemps />} />
            <Route path="/ajouter-emploi-du-temps" element={<Ajoutempdutemps />} />
            <Route path="/modifier-emploi-du-temps/:id" element={<Modificationempdutemps />} />
            <Route path="/Gererlesconges" element={<Gererlesconges/>} /> 
            <Route path="/Gererlesformations" element={<Gererlesformations />} />
            <Route path="/ajouter-formation" element={<Ajouterformation />} />
            <Route path="/modifier-formation/:id" element={<Modifierformation />} />
            <Route path="/profileRH" element={<ProfileRH />} />
            <Route path="/editProfileRH/:id" element={<EditProfileRH />} />

        </Routes>
    </Router>
    );
}
 


