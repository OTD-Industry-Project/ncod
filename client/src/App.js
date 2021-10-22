import React, { useState, useEffect } from "react";
import './App.css';

function App() {

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
    .then((res) => res.json())
    .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
        {/* Bootstrap classes */}
        <p className="h1 text-center mt-5">
          
          {/* Displays loading... if data has loaded yet */}
          {!data ? "loading..." : data}
        </p>
        
     
    </div>
  );
}

export default App;
