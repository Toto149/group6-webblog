import {useState, useEffect} from 'react';
import {administrator} from "./Benutzer";
import {kommentar, beitrag } from "./Beitrag";

function App() {

    const [benutzers, setBenutzers] = useState([administrator]);
    const [beitraege, setBeitraege] = useState([beitrag]);
    const [kommentare, setKommentare] = useState([kommentar])

    useEffect(() => {
        localStorage.setItem('kommentare', JSON.stringify(kommentare));
    }, [kommentare]);
    useEffect(() => {
        localStorage.setItem('benutzers', JSON.stringify(benutzers));
    }, [benutzers]);

    useEffect(() => {
        localStorage.setItem('beitraege', JSON.stringify(beitraege));
    }, [beitraege]);

    useEffect(() => {
        const benutzers = JSON.parse(localStorage.getItem('benutzers'));
        const beitraege = JSON.parse(localStorage.getItem('beitraege'));
        const kommentare = JSON.parse(localStorage.getItem('kommentare'));


        if(kommentare){
            setKommentare(kommentare)
        }
        if(beitraege){
            setBeitraege(beitraege)
        }
        if (benutzers) {
            setBenutzers(benutzers);
        }
    }, []);

  return (
      <div>

          <p>{localStorage.getItem("benutzers")}</p>
          <p>{beitraege[0].inhalt}</p>
          <p>{localStorage.getItem("kommentare")}</p>
      </div>
  );
}

export default App;
