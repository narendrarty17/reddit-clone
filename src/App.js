import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/utils/Header';
import Nav from './components/Nav';
import GroupHome from './components/GroupHome';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Header />
      <div className='flex w-[100%]'>
        <Nav />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/groupHome/:groupName" element={<GroupHome name="Dry Eye" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
