import Header from './components/utils/Header';
import Navigation from './components/Navigation';
import GroupHome from './components/GroupHome';

function App() {
  return (
    <>
      <Header />
      <div className='flex w-[100%]'>
        <Navigation />
        <GroupHome name="DryEye" />
      </div>
    </>
  );
}

export default App;
