import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import { PrivateRoute } from './components/privateRoute';
import context from './context/context';
import AuthenticationService from './services/Authentification-service';
import UserList from './pages/users';
import UsersDetail from './pages/user-detail';
import UserEdit from './pages/user-edit';
import Test from './pages/Test';

AuthenticationService.setup();

const App: React.FC = () => {
  const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(
    AuthenticationService.isAuthenticatedUser,
  );

  const contextValue = {
    isAuthenticatedUser,
    setIsAuthenticatedUser,
  };

  return (
    <>
      <context.Provider value={contextValue}>
        <BrowserRouter>
          <div>
            {/* <Header /> */}
            {/* Le système de gestion des routes de notre application */}
            <Routes>
              {/* <PrivateRoute exact path="/users" component={<UserList />} /> */}
              <Route path="/test" element={<Test />} />
              <Route  path="/users/:id" element={<UsersDetail />} />
              <Route  path="/users/edit/:id" element={<UserEdit />} />
              <Route  path="/users" element={<UserList />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </BrowserRouter>
      </context.Provider>
    </>
  );
};

export default App;
