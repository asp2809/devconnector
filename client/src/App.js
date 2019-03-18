import React, { Component } from "react";
import "./App.css";

// Import Files
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Landing from "./components/Landing";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Landing />
        <Footer />
      </div>
    );
  }
}

export default App;
