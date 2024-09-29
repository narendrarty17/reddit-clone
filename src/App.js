import Header from './components/utils/Header';
import Nav from './components/Nav';
import GroupHome from './components/GroupHome';

function App() {
  return (
    <>
      <Header />
      <div className='flex w-[100%]'>
        <Nav />
        <GroupHome name="DryEye" />
      </div>
    </>
  );
}

export default App;
