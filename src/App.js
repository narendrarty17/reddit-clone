import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/utils/Header';
import Nav from './components/Nav';
import GroupHome from './components/GroupHome';
import CreatePost from './components/CreatePost';

function App() {
  return (
    <Router>
      <Header />
      <div className='flex w-[100%]'>
        <Nav />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<GroupHome name="DryEye" />} />
            <Route path="/another" element={<CreatePost />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
