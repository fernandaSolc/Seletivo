import { Routes, Route } from 'react-router';
import SignUp from '../components/cadastroAluno/SignUp';
import Login from '../components/LoginAluno/Login';
import VerifyNumber from '../components/VerifyNumber/VerifyNumber';
import VerifyEmail from '../components/VerifyEmail/VerifyEmail';
import SucessMessage from '../components/SuccessMessage/SuccessMessage'
import AuthLayout from '../layout/AuthLayout';
import MainLayout from '../layout/MainLayout';
// import PrivateRoute from '../components/PrivateRoute';
import Questionnaire from '../components/Form/Questionnaire'
import ProcessosSeletivosCard from '../components/ProcessosSeletivosCard/ProcessosSeletivosCard';
import EnemUploadScreen from '../components/EnemUploadScreen/EnemUploadScreen';
import MeritScreen from '../components/Merito/MeritScreen';
import StatusPage from '../components/StatusCandidatura/StatusCandidatura';
import ExamScreen from '../components/Prova/ExamScreen';
import ContractScreen from '../components/Contrato/ContractScreen'
import FormAdress from '../components/RegistrationForm/FormAdress'
import FormPersonal from '../components/RegistrationForm/FormPersonal';
import FormPersonal2 from '../components/RegistrationForm/FormPersonal2';
import FormDocs from '../components/RegistrationForm/FormDocs';
import ContractPendingPage from '../components/ContractPending/ContractPendingPage';
import CredentialsPage from '../components/Credenciais/CredentialsPage';
import CongratulationPage from '../components/Congratulation/CongratulationPage';
import EmailVerificationPage from '../components/VerifyEmail/EmailVerificationPage';
import NumberVerificationPage from '../components/VerifyNumber/NumberVerificationPage';
import EnemGradeVerificationPage from '../components/EnemUploadScreen/EnemGradeVerification';
import MeritUpload from '../components/Merito/MeritDocumentPage';

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
        path="/processos-seletivos"
        element={
          <MainLayout>
            <ProcessosSeletivosCard />
          </MainLayout>
        }/>
        <Route
        path="/enem-upload"
        element={
          <MainLayout>
            <EnemUploadScreen />
          </MainLayout>
        }/>

        <Route
        path="/merit"
        element={
          <MainLayout>
            <MeritScreen />
          </MainLayout>
        }/>
        <Route
        path="/status"
        element={
          <MainLayout>
            <StatusPage />
          </MainLayout>
        }/> 

     <Route
        path="/exam"
        element={
          <MainLayout>
            <ExamScreen />
          </MainLayout>
        }/>  
        <Route
        path="/contract"
        element={
          <AuthLayout>
            <ContractScreen />
          </AuthLayout>
        }/>
        <Route
        path="/form-adress"
        element={
          <MainLayout>
            <FormAdress />
          </MainLayout>
        }/>  

        <Route
        path="/form-personal"
        element={
          <MainLayout>
            <FormPersonal />
          </MainLayout>
        }/>
        <Route
        path="/form-personal2"
        element={
          <MainLayout>
            <FormPersonal2 />
          </MainLayout>
        }/>
        <Route
        path="/form-docs"
        element={
          <MainLayout>
            <FormDocs/>
          </MainLayout>
        }/>

        <Route
        path="/contract-pending"
        element={
        <MainLayout>
          <ContractPendingPage/>
        </MainLayout>
        }/>

        <Route
        path="/credentials"
        element={
        <MainLayout>
          <CredentialsPage/>
        </MainLayout>
        }/>

        <Route
        path="/congratulation"
        element={
        <MainLayout>
          <CongratulationPage/>
        </MainLayout>
        }/>

        <Route
        path="/email-verification"
        element={
        <MainLayout>
          <EmailVerificationPage/>
        </MainLayout>
        }/>

        <Route
        path="/number-verification"
        element={
        <MainLayout>
          <NumberVerificationPage/>
        </MainLayout>
        }/>

        <Route
        path="/enem-grade"
        element={
        <MainLayout>
          <EnemGradeVerificationPage/>
        </MainLayout>
        }/>

        <Route
        path="/merit-upload"
        element={
        <MainLayout>
          <MeritUpload/>
        </MainLayout>
        }/>

       <Route
        path="*"
        element={
          <AuthLayout>
            <Login />
          </AuthLayout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
