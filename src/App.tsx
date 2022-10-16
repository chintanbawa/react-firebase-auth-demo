import React from 'react';
import { ToastProvider } from 'react-toast-notifications';

//routes
import AppRoutes from './routes'
//configs
import 'configs/firebase-config' // importing firebase config to intialize



function App() {
  return (
    <ToastProvider autoDismissTimeout={5000} transitionDuration={220}>
      <AppRoutes />
    </ToastProvider>
  );
}

export default App;
