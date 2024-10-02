import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/utils/Header';
import Nav from './components/Nav';
import GroupHome from './components/GroupHome';

function App() {
  return (
    <Router>
      <Header />
      <div className='flex w-[100%]'>
        <Nav />
        <Routes>
          <Route path="/" element={<GroupHome name="DryEye" />} />
          <Route path="/another" element={<div>Another Route</div>} />
          {/* Add more routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
