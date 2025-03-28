import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import HomePage from './pages/Home';
import ContactPage from './pages/Contact';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
    ],
  },
]);