import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TranslationProvider } from './context/TranslationContext';
import { Layout } from './layout/Layout';
import { Home } from './pages/Home';
import { Cards } from './pages/Cards';
import { Quiz } from './pages/Quiz';

function App() {
  return (
    <TranslationProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="cards" element={<Cards />} />
          </Route>
          <Route path="quiz" element={<Quiz />} />
        </Routes>
      </BrowserRouter>
    </TranslationProvider>
  );
}

export default App;
