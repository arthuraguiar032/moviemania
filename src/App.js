import './App.css';
import Header from './components/Header';
import MovieContent from './components/MovieContent';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <div className="App">
      <Header />
      <MovieContent />
      <h1>React App</h1>
      <SearchBar placeholder="Search for a movie" />
    </div>
  );
}

export default App;
