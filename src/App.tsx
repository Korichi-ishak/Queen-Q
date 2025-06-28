import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TranslationProvider } from './context/TranslationContext';
import { Layout } from './layout/Layout';
import { Home } from './pages/Home';
import { Cards } from './pages/Cards';
import { Quiz } from './pages/Quiz';
import { Chat } from './pages/Chat';
import { Journal } from './pages/Journal';
import { Shop } from './pages/Shop';

function App() {
  return (
    <TranslationProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="cards" element={<Cards />} />
            <Route path="quiz" element={<Quiz />} />
            <Route path="chat" element={<Chat />} />
            <Route path="journal" element={<Journal />} />
            <Route path="shop" element={<Shop />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TranslationProvider>
  );
}

export default App;
