import {useState, useEffect} from 'react';
import {administrator, benutzer1, benutzer2, benutzer3} from "./Benutzer";
import AnmeldeLeiste from "./components/anmeldung/AnmeldeLeiste";


function App() {

    const [benutzers, setBenutzers] = useState((JSON.parse(localStorage.getItem('benutzers'))||[administrator, benutzer1, benutzer2, benutzer3]));

    useEffect(() => {
        localStorage.setItem('benutzers', JSON.stringify(benutzers));
    }, [benutzers]);

    useEffect(() => {
        const benutzers = JSON.parse(localStorage.getItem('benutzers'));
        if (benutzers) {
            setBenutzers(benutzers);
        }
    }, []);



    const [aktuellerBenutzer, setAktuellerBenutzer] = useState(null);

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

      </div>
  );
}

export default App;

/*
<MeinHeader/>
<AnmeldeLeiste/>
<Beitraege>

    <BeitragErstellen>

    </BeitragErstellen>

    <Beitrag>

        <Kommentare>
            <KommentarErstellen>

            </KommentarErstellen>
            <Kommentar>

            </Kommentar>
        </Kommentare>
    </Beitrag>

</Beitraege>

<MeinFooter/>

 */