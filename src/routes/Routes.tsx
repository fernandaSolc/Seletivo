import React from 'react';
import { Routes, Route } from 'react-router';
import SignUp from '../components/cadastroAluno/SignUp';
import Login from '../components/LoginAluno/Login';
import VerifyNumber from '../components/VerifyNumber/VerifyNumber';
import VerifyEmail from '../components/VerifyEmail/VerifyEmail';
import SucessMessage from '../components/SuccessMessage/SuccessMessage'
import AuthLayout from '../layout/AuthLayout';
import MainLayout from '../layout/MainLayout';
import PrivateRoute from '../components/PrivateRoute';
import Questionnaire from '../components/Form/Questionnaire'

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <AuthLayout>
            <Login />
          </AuthLayout>
        }
      />
      <Route
        path="/signup"
        element={
          <AuthLayout>
            <SignUp />
          </AuthLayout>
        }
      />
      <Route
        path="/verify-number"
        element={
          
          <AuthLayout>
            <VerifyNumber />
          </AuthLayout>
        }
      />
      <Route
        path="/verify-email"
        element={
          <AuthLayout>
            <VerifyEmail />
          </AuthLayout>
        }
      />
      <Route
        path="/sucess"
        element={
          
          <AuthLayout>
            <SucessMessage />
          </AuthLayout>
        }
      />
      <Route
        path="/questionnaire"
        element={
          
          <AuthLayout>
            <Questionnaire />
          </AuthLayout>
        }
      />
      <Route
        path="*"
        element={
          <MainLayout>
            <div>pipipipopopo</div>
          </MainLayout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
