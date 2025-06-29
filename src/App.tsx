import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TranslationProvider } from './context/TranslationContext';
import { Layout } from './layout/Layout';
import { Home } from './pages/Home';
import { Cards } from './pages/Cards';
import { Application } from './pages/Application';
import Apropos from './pages/Apropos';
import ScrollToTop from './components/ScrollToTop';
// import { Quiz } from './pages/Quiz';
// import { Chat } from './pages/Chat';
// import { Journal } from './pages/Journal';
// import { Shop } from './pages/Shop';

function App() {
  return (
    <TranslationProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="cards" element={<Cards />} />
            <Route path="application" element={<Application />} />
            <Route path="apropos" element={<Apropos />} />
            {/* <Route path="quiz" element={<Quiz />} /> */}
            {/* <Route path="chat" element={<Chat />} /> */}
            {/* <Route path="journal" element={<Journal />} /> */}
            {/* <Route path="shop" element={<Shop />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </TranslationProvider>
  );
}

export default App;
