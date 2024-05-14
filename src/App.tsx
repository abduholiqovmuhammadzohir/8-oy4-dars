import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { RequireAuth } from './components/RequireAuth';
import { ProfilePage } from './pages/ProfilePage';

export default function App() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route element={<RequireAuth />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
    </Routes>
  );
}
