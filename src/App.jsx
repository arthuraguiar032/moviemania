import { Outlet } from 'react-router-dom';
import Header from '../src/components/Layout/Header';
import Footer from '../src/components/Layout/Footer';

function App() {
  return (
    <div className="App">
      <Header/>
      
      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;
