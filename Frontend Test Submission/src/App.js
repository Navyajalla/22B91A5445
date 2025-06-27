// src/App.js
import { BrowserRouter, Routes, Route, useParams, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Stats from './pages/Stats';
import { logger } from './components/Logger';
import { getGeoMock } from './utils/shortener';

const Redirector = () => {
  const { code } = useParams();
  const links = JSON.parse(localStorage.getItem("shortLinks") || "{}");
  const link = links[code];

  if (link && new Date(link.expiresAt) > new Date()) {
    link.clicks.push({
      timestamp: new Date().toISOString(),
      source: "browser",
      geo: getGeoMock(),
    });
    links[code] = link;
    localStorage.setItem("shortLinks", JSON.stringify(links));
    logger("Redirect", { code });
    window.location.href = link.longUrl;
  }

  return <Navigate to="/" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/:code" element={<Redirector />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
