import {useState, useEffect} from 'react';

import {administrator, benutzer1, benutzer2, benutzer3} from "./Benutzer";
import AnmeldeLeiste from "./components/anmeldung/AnmeldeLeiste";
import {kommentar, beitrag, kommentar2} from "./Beitrag";
import Kommentare from "./components/kommentare/Kommentare";
import Beitraege from "./components/Beitraege";

function App() {
    const [benutzers, setBenutzers] = useState((JSON.parse(localStorage.getItem('benutzers')) || [administrator, benutzer1, benutzer2, benutzer3]));
    const [beitraege, setBeitraege] = useState((JSON.parse(localStorage.getItem('beitraege')) || [beitrag]));
    const [kommentare, setKommentare] = useState((JSON.parse(localStorage.getItem('kommentare')) || [kommentar,kommentar2]));


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
            <Beitraege beitraege={beitraege} setBeitraege={setBeitraege} kommentare={kommentare} setKommentare={setKommentare} aktuellerBenutzer={aktuellerBenutzer}/>
            {/*<Kommentare id="1" useKommentare={kommentare} setKommentare={setKommentare}/>*/}

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