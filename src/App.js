import {useState, useEffect} from 'react';
import {kommentar, beitrag, beitrag2} from "./Beitrag";
import Beitraege from "./components/Beitraege";
import {administrator, benutzer1, benutzer2, benutzer3} from "./Benutzer";
import AnmeldeLeiste from "./components/anmeldung/AnmeldeLeiste";
import Kommentare from "./components/kommentare/Kommentare";


function App() {
    const [istAltZuNeu, setIstAltZuNeu] = useState(false)
    const [beitraege, setBeitraege] = useState(JSON.parse(localStorage.getItem('beitraege')) || [beitrag,beitrag2]);
    const [benutzers, setBenutzers] = useState((JSON.parse(localStorage.getItem('benutzers'))||[administrator, benutzer1, benutzer2, benutzer3]));
    const [kommentare, setKommentare] = useState(JSON.parse(localStorage.getItem('kommentare')) || [kommentar])
    const [titel, setTitel] = useState("");
    const [textInhalt, setTextInhalt] = useState("");
    const [kategorie, setKategorie] = useState("");
    const [aktuellerBenutzer, setAktuellerBenutzer] = useState(null);

    useEffect(() => {
        localStorage.setItem('kommentare', JSON.stringify(kommentare));
    }, [kommentare]);
    useEffect(() => {
        localStorage.setItem('benutzers', JSON.stringify(benutzers));
    }, [benutzers]);

    useEffect(() => {
        localStorage.setItem('beitraege', JSON.stringify(beitraege));
    }, [beitraege,istAltZuNeu]);

    useEffect(() => {
        const benutzers = JSON.parse(localStorage.getItem('benutzers'));
        const beitraege = JSON.parse(localStorage.getItem('beitraege'));
        const kommentare = JSON.parse(localStorage.getItem('kommentare'));
        console.log(beitraege)

        if (kommentare) {
            setKommentare(kommentare)
        }
        if (beitraege) {
            setBeitraege(beitraege)
        }
        if (benutzers) {
            setBenutzers(benutzers);
        }
    }, []);





    useEffect(() => {
        const localerBenutzer = JSON.parse(localStorage.getItem('aktuellerBenutzer'));
        if (localerBenutzer) {
            setAktuellerBenutzer(localerBenutzer);
        }
    }, []);

    useEffect(() => {
        if (aktuellerBenutzer) {
            localStorage.setItem('aktuellerBenutzer', JSON.stringify(aktuellerBenutzer));
        } else {
            localStorage.removeItem('aktuellerBenutzer');
        }
    }, [aktuellerBenutzer]);




  return (
      <div>


          <AnmeldeLeiste benutzers={benutzers}
                         setBenutzers={setBenutzers}
                         aktuellerBenutzer={aktuellerBenutzer}
                         setAktuellerBenutzer={setAktuellerBenutzer}
          />

          { <Beitraege beitraege={beitraege}
                       neu={istAltZuNeu}
                       setNeu={setIstAltZuNeu}
                       setBeitraege={setBeitraege}
                       kommentare={kommentare}
                       setKommentare={setKommentare}
                       aktuellerBenutzer={aktuellerBenutzer}
                       titel={titel}
                       setTitel={setTitel}
                       textInhalt={textInhalt}
                       setTextInhalt={setTextInhalt}
                       kategorie={kategorie}
                       setKategorie={setKategorie} />}


        </div>
    );
}

export default App;

