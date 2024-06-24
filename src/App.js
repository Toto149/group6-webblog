import {useState, useEffect} from 'react';
import {administrator} from "./Benutzer";


function App() {

    const [benutzers, setBenutzers] = useState([administrator]);

    useEffect(() => {
        localStorage.setItem('benutzers', JSON.stringify(benutzers));
    }, [benutzers]);

    useEffect(() => {
        const benutzers = JSON.parse(localStorage.getItem('benutzers'));
        if (benutzers) {
            setBenutzers(benutzers);
        }
    }, []);

  return (
      <div>

          <p>{localStorage.getItem("benutzers")}</p>

      </div>
  );
}

export default App;
