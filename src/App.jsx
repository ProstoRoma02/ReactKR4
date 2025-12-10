import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import TechnologyList from './pages/TechnologyList.jsx';
import TechnologyDetail from './pages/TechnologyDetail.jsx';
import AddTechnology from './pages/AddTechnology.jsx';
import Stats from './pages/Stats.jsx';
import Settings from './pages/Settings.jsx';
import MuiShowcase from './pages/MuiShowcase.jsx';
import Login from './pages/Login.jsx';
import Navigation from './components/Navigation.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { TechnologiesProvider } from './context/TechnologiesContext.jsx';
import { ThemeModeProvider } from './context/ThemeContext.jsx';

const App = () => (
  <ThemeModeProvider>
    <AuthProvider>
      <TechnologiesProvider>
        <div className="app">
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/technologies" element={<TechnologyList />} />
              <Route path="/technology/:techId" element={<TechnologyDetail />} />
              <Route
                path="/add-technology"
                element={
                  <ProtectedRoute>
                    <AddTechnology />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/stats"
                element={
                  <ProtectedRoute>
                    <Stats />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />
              <Route path="/mui" element={<MuiShowcase />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
        </div>
      </TechnologiesProvider>
    </AuthProvider>
  </ThemeModeProvider>
);

export default App;

