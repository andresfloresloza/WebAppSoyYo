import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';

import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import LoginView from './routes/loginView';
import LinksPrimaryView from './routes/linksPrimaryView';
import LinksSecondaryView from './routes/linksSecondaryView';
import EditProfileView from './routes/editProfileView';
import SignOutView from './routes/signOutView';
import PublicProfileView from './routes/publicProfileView';
import ChooseUserNameView from './routes/chooseUsernameView';
import DashboardView from './routes/dashboardView';
import EditProfileDesignView from './routes/editProfileDesignView';
import LinksCustomView from './routes/linksCustomView';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<DashboardView />}></Route>
        <Route exact path="/inicio" element={<DashboardView />}></Route>
        <Route exact path="/iniciar-sesion" element={<LoginView />}></Route>
        <Route exact path="/enlaces/principales" element={<LinksPrimaryView />}></Route>
        <Route exact path="/enlaces/secundarios" element={<LinksSecondaryView />}></Route>
        <Route exact path="/enlaces/personalizados" element={<LinksCustomView />}></Route>
        <Route exact path="/perfil" element={<EditProfileView />}></Route>
        <Route exact path="/diseno" element={<EditProfileDesignView />}></Route>
        <Route exact path="cerrar-sesion" element={<SignOutView />}></Route>
        <Route exact path="u/:publicId" element={<PublicProfileView />}></Route>
        <Route exact path="/asignar-alias" element={<ChooseUserNameView />}></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
