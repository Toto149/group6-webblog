import {useState, useEffect} from 'react';
import {kommentar, beitrag, beitrag2} from "./Beitrag";
import Beitraege from "./components/Beitraege";
import {administrator, benutzer1, benutzer2, benutzer3} from "./Benutzer";
import AnmeldeLeiste from "./components/anmeldung/AnmeldeLeiste";

//Verbindung mit DB
import {createClient} from "@supabase/supabase-js";
import generiereZufaelligeID from "./components/kommentare/GeneriereID";
const supabaseUrl = "https://hsyjtnkoizsbrwkgyjid.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzeWp0bmtvaXpzYnJ3a2d5amlkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxOTM4NjMyMywiZXhwIjoyMDM0OTYyMzIzfQ.NNi48gm9BAf1S65ESyFAQbvxeAlhBWvrGe8BzN-N8So";
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {

    //const [beitraege, setBeitraege] = useState(JSON.parse(localStorage.getItem('beitraege')) || [beitrag,beitrag2]);
    //const [benutzers, setBenutzers] = useState((JSON.parse(localStorage.getItem('benutzers'))||[administrator, benutzer1, benutzer2, benutzer3]));
    //const [kommentare, setKommentare] = useState(JSON.parse(localStorage.getItem('kommentare')) || [kommentar])
    const [aktuellerBenutzer, setAktuellerBenutzer] = useState(null);

    //DB beginn
    const [benutzers, setBenutzers] = useState([]);
    const [rollen, setRollen] = useState([]);

    const [beitraege, setBeitraege] = useState([]);
    const [kommentare, setKommentare] = useState([])

    const [benutzerDB, setBenutzerDB] = useState([]);
    const [rollenDB, setRollenDB] = useState([]);
    const [beitraegeDB, setBeitraegeDB] = useState([]);
    const [kommentareDB, setKommentareDB] = useState([]);

    useEffect(() => {
        getDatenAusDB();
    }, []);

    useEffect(() => {
        if (benutzerDB && rollenDB && benutzerDB.length > 0 && rollenDB.length > 0) {
            let rollenAusDB = rollenFüllen();
            setRollen(rollenAusDB);

            let benutzersAusDB = benutzerFüllen();
            setBenutzers(benutzersAusDB);
        }
        if (beitraegeDB && beitraegeDB.length > 0) {
            let beitraegeAusDB = beitraegeFüllen();
            setBeitraege(beitraegeAusDB);
        }
        if (kommentareDB && kommentareDB.length > 0) {
            let kommentareAusDB = kommentareFüllen();
            setKommentare(kommentareAusDB);
        }

    }, [benutzerDB, rollenDB, beitraegeDB, kommentareDB]);

    useEffect(() => {
        // befor ende
        const benutzersSpeichern = () => {

                //BenutzerInDBSpeichern();


        };

        window.addEventListener('beforeunload', benutzersSpeichern);

        return () => {
            window.removeEventListener('beforeunload', benutzersSpeichern);
        };
    }, []);

    async function BenutzerInDBSpeichern() {
        try {
            const benutzersZurDB = benutzers.map(b => ({
                name: b.name,
                passwort: b.passwort,
                avatarURL: b.avatar,
                rolleName: b.rolleName
            }));

            const { data, error } = await supabase
                .from('benutzer')
                .upsert(benutzersZurDB)
                .select();

            if (error) {
                throw error;
            }

            alert('Benutzers sind gespeichert:', data);
        } catch (error) {
            alert('Error Benutzersspeicherung:', error.message);
        }
    }




    async function getDatenAusDB() {
        await getBenutzerAusDB();
        await getRollenAusDB();
        await getBeitraegeAusDB();
        await getKommentareAusDB();
    }

    async function getBenutzerAusDB() {
        const { data } = await supabase.from("benutzer").select();
        setBenutzerDB(data || []);
    }

    async function getRollenAusDB() {
        const { data } = await supabase.from("rollen").select();
        setRollenDB(data || []);
    }

    async function getBeitraegeAusDB() {
        const { data } = await supabase.from("beitraege").select();
        setBeitraegeDB(data || []);
    }

    async function getKommentareAusDB() {
        const { data } = await supabase.from("kommentare").select();
        setKommentareDB(data || []);
    }

    function benutzerFüllen() {
        let benutzersAusDB = [];
        benutzerDB.forEach((benutzerRow) => {
            const tempBenutzer = {
                name: benutzerRow.name,
                passwort: benutzerRow.passwort,
                avatar: benutzerRow.avatarURL,
                rolleName: null,
                rolle: null
            };

            rollenDB.forEach((rolleRow) => {
                if (rolleRow.name === benutzerRow.rolleName) {
                    tempBenutzer.rolle = {
                        name: rolleRow.name,
                        kannKommentieren: rolleRow.kannKommentieren,
                        kannKommentareLöschen: rolleRow.kannKommentareLöschen,
                        kannBeitragLöschen: rolleRow.kannBeitragLöschen,
                        kannBeitragVerfassen: rolleRow.kannBeitragVerfassen,
                        kannBeitragVerändern: rolleRow.kannBeitragVerändern,
                        kannRolleÄndern: rolleRow.kannRolleÄndern,
                    };
                    tempBenutzer.rolleName = rolleRow.name;
                }
            });
            benutzersAusDB.push(tempBenutzer);
        });
        return benutzersAusDB;
    }


    function rollenFüllen() {
        let rollenAusDB = [];
            rollenDB.forEach((rolleRow) => {
                const tempRolle = {
                    name: rolleRow.name,
                    kannKommentieren: rolleRow.kannKommentieren,
                    kannKommentareLöschen: rolleRow.kannKommentareLöschen,
                    kannBeitragLöschen: rolleRow.kannBeitragLöschen,
                    kannBeitragVerfassen: rolleRow.kannBeitragVerfassen,
                    kannBeitragVerändern: rolleRow.kannBeitragVerändern,
                    kannRolleÄndern: rolleRow.kannRolleÄndern,
                };
                rollenAusDB.push(tempRolle);
            });
        return rollenAusDB;
    }

    function beitraegeFüllen() {
        let beitraegeAusDB = [];
        beitraegeDB.forEach((beitragRow) => {
            const tempBeitrag = {
                "id": beitragRow.id,
                "titel" : beitragRow.titel,
                "nutzer" : beitragRow.benutzerName,
                "inhalt": beitragRow.inhalt,
                "publizierungsDatum": beitragRow.publizierungsDatum,
                "erstellungsDatum": beitragRow.erstellungsDatum,
                "kommentare" : [],
                "kategorien": [], //beitragRow.kategorien
                "bildUrl": beitragRow.bildURL
            };
            beitraegeAusDB.push(tempBeitrag);
        });
        return beitraegeAusDB;
    }

    function kommentareFüllen() {
        let kommentareAusDB = [];
        kommentareDB.forEach((kommentarRow) => {
            const tempKommentar = {
                "id": kommentarRow.id,
                "nutzer": kommentarRow.benutzerName,
                "inhalt": kommentarRow.inhalt,
                "datum": kommentarRow.datum,
                "editDatum": kommentarRow.editDatum,
                "beitragsId": kommentarRow.beitragsID,
            };
            kommentareAusDB.push(tempKommentar);
        });
        return kommentareAusDB;
    }

    ////DB end

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
                               rollen={rollen}
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
                                benutzers={benutzers}
                    />}

                </div>
            </div>


            <div className="hero-foot">


            </div>


        </section>


    );
}

export default App;


/*
beitraege

id
titel
inhalt
kategorien
benutzerName
erstellungsDatum
publizierungsDatum
bildURL
 */
/*
const neuerBeitrag = {
    "id": Date.now().toString(),
    "titel" : titel,
    "nutzer" : aktuellerBenutzer,
    "inhalt": textInhalt,
    "publizierungsDatum": Date.now(),
    "erstellungsDatum": Date.now(),
    "kommentare" : [],
    "kategorien": [kategorie],
    "bildUrl": bildUrl
};

 */

/*
kommentare

id
benutzerName
inhalt
datum
editDatum
beitragsID
*/

/*
const tempKommentar = {
    "id": generiereZufaelligeID(),
    "nutzer": props.aktuellerBenutzer,
    "inhalt": inhalt,
    "datum": Date.now(),
    "editDatum": null,
    "beitragsId": beitragsId,
}

 */



