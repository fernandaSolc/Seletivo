import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store'; // your Redux store
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/Routes';
import AppTheme from './components/cadastroAluno/shared-theme/AppTheme';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppTheme>
        <Router>
          <AppRoutes />
        </Router>
      </AppTheme>
    </Provider>
  );
};

export default App;