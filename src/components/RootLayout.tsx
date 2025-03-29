import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '../components/theme-provider';

export default function RootLayout() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background">
        <main>
          <Outlet />
        </main>
      </div>
    </ThemeProvider>
  );
}