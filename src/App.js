import "./App.css";
import Items from "./components/Items/Items";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Header from "./components/Header/Header";
function App() {
  return (
    <div className="App">
      <Header />
      <Items />
    </div>
  );
}

export default App;
