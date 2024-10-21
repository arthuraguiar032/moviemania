import { Outlet } from 'react-router-dom';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';

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
