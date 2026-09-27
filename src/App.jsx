import { Outlet } from "react-router";

function App() {
  return (
    <div className="app">
      <h1>Navbar</h1>
      <Outlet></Outlet>
      <h1>footer</h1>
    </div>
  );
}

export default App;
