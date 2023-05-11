import Header from "./Components/Header";
import Footer from "./Components/Footer";
import MainBody from "./Components/MainBody";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{}}>
        <Header />
      </div>
      <div style={{display:"flex", justifyContent:"center"}}>
        <MainBody />
      </div>
      <div style={{ marginTop: "200px" }}>
        <Footer />
      </div>
    </div>
  );
}

export default App;
