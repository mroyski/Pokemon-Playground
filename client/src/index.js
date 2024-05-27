import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
  // <React.StrictMode>
  //   <LogContext.Provider value={logs}>
  //     <QueryClientProvider client={queryClient}>
  //       <RouterProvider router={router} />
  //     </QueryClientProvider>
  //   </LogContext.Provider>
  // </React.StrictMode>
);
