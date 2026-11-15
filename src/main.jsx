import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router';

import './index.css';
import App from './App.jsx';
import Home from './Pages/Home.jsx';
import Cart from './Pages/Cart.jsx';
import Shop from './Pages/Shop.jsx';

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: '/home', element: <Home /> },
      { path: '/ninja-shop', element: <Shop /> },
      { path: '/your-inventory', element: <Cart /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);