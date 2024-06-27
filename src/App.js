import {useState, useEffect} from 'react';
import {kommentar, beitrag, beitrag2} from "./Beitrag";
import Beitraege from "./components/Beitraege";
import {administrator, benutzer1, benutzer2, benutzer3} from "./Benutzer";
import AnmeldeLeiste from "./components/anmeldung/AnmeldeLeiste";



function App() {

    const [beitraege, setBeitraege] = useState(JSON.parse(localStorage.getItem('beitraege')) || [beitrag,beitrag2]);
    const [benutzers, setBenutzers] = useState((JSON.parse(localStorage.getItem('benutzers'))||[administrator, benutzer1, benutzer2, benutzer3]));
    const [kommentare, setKommentare] = useState(JSON.parse(localStorage.getItem('kommentare')) || [kommentar])
    const [aktuellerBenutzer, setAktuellerBenutzer] = useState(null);



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

        <section className="hero is-info is-fullheight">
            <div className="hero-head is-fixed-top">

                <AnmeldeLeiste benutzers={benutzers}
                               setBenutzers={setBenutzers}
                               aktuellerBenutzer={aktuellerBenutzer}
                               setAktuellerBenutzer={setAktuellerBenutzer}
                />

            </div>


            <div className="hero-body">




                <div className="container has-text-centered">


                    <div className="container">
                        <div className="container has-text-centered">
                            <div className="column is-6 is-offset-3">


                                <h1 className="title title is-2 is-color-info ">
                                    CYBERSECURITY BLOG
                                </h1>
                                <h2 className="subtitle is-6 is-color-text">
                                    Hier findest du aktuelle Nachrichten, Analysen und tiefgehende Artikel rund um die
                                    Welt der Cybersicherheit, Hacker-Kultur und digitalen Innovationen. Bleibe informiert
                                    über die neuesten Trends, Technologien und Strategien zum Schutz deiner Daten in
                                    einer vernetzten Welt. Tauche ein in spannende Diskussionen und lerne von Experten,
                                    wie du dich im digitalen Zeitalter sicher bewegst.
                                </h2>





                            </div>
                        </div>

                    </div>


                    {<Beitraege beitraege={beitraege}
                                setBeitraege={setBeitraege}
                                kommentare={kommentare}
                                setKommentare={setKommentare}
                                aktuellerBenutzer={aktuellerBenutzer}
                    />}

                </div>
            </div>


            <div className="hero-foot">


            </div>


        </section>


    );
}

export default App;







