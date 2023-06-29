import "./app.css";
import Goal from "./components/controls/goal";
import Year from "./components/controls/year";
import Chart from "./components/chart";
import MapContainer from "./components/map";

function App() {
  return (
    <div className="App">
      <div className="side">
        <div className="control">
          <Goal />
          <Year />
        </div>
        <Chart />
      </div>
      <MapContainer />
    </div>
  );
}

export default App;
