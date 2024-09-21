import Header from './components/utils/Header';
import Navigation from './components/Navigation';
import CommunityHome from './components/CommunityHome';

function App() {
  return (
    <>
      <Header />
      <div className='flex w-[100%]'>
        <Navigation />
        <CommunityHome />
      </div>
    </>
  );
}

export default App;
