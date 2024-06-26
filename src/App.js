import {useState, useEffect} from 'react';
import {kommentar, beitrag, beitrag2} from "./Beitrag";
import Beitraege from "./components/Beitraege";
import {administrator, benutzer1, benutzer2, benutzer3} from "./Benutzer";
import AnmeldeLeiste from "./components/anmeldung/AnmeldeLeiste";

//Verbindung mit DB
import {createClient} from "@supabase/supabase-js";
import generiereZufaelligeID from "./components/kommentare/GeneriereID";
import Footer from "./components/Footer";
const supabaseUrl = "https://hsyjtnkoizsbrwkgyjid.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzeWp0bmtvaXpzYnJ3a2d5amlkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxOTM4NjMyMywiZXhwIjoyMDM0OTYyMzIzfQ.NNi48gm9BAf1S65ESyFAQbvxeAlhBWvrGe8BzN-N8So";
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {

    const [aktuellerBenutzer, setAktuellerBenutzer] = useState(null);

    //DB beginn
    const [benutzers, setBenutzers] = useState([]);
    const [rollen, setRollen] = useState([]);

    const [beitraege, setBeitraege] = useState([]);
    const [kommentare, setKommentare] = useState([]);

    const [beitragIdFürLöschen, setBeitragIdFürLöschen] = useState(null);
    const [kommentarIdFürLöschen, setKommentarIdFürLöschen] = useState(null);

    const [benutzerDB, setBenutzerDB] = useState([]);
    const [rollenDB, setRollenDB] = useState([]);
    const [beitraegeDB, setBeitraegeDB] = useState([]);
    const [kommentareDB, setKommentareDB] = useState([]);


    useEffect(() => {
        getDatenAusDB();
    }, []);

    useEffect(() => {
        if (beitragIdFürLöschen) deleteBeitrag();
    }, [beitragIdFürLöschen]);


    useEffect(() => {
        if (kommentarIdFürLöschen) {
            deleteKommentar();
        }
    }, [kommentarIdFürLöschen]);

    useEffect(() => {
        benutzerSpeichern();
        //console.log(JSON.stringify(benutzers))
    }, [benutzers]);

    useEffect(() => {
        beitraegeSpeichern();
    }, [beitraege]);

    useEffect(() => {
        kommentareSpeichern();
    }, [kommentare]);

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


    async function benutzerSpeichern() {
        let benutzersInDB = [];

        benutzers.map((Row) => {
            const tempBenutzer = {
                name: Row.name,
                passwort: Row.passwort,
                avatarURL: Row.avatar,
                rolleName: Row.rolleName,
            };

            benutzersInDB.push(tempBenutzer);
        })

        const { data, error } = await supabase
            .from('benutzer')
            .upsert(benutzersInDB)
            .select();

        if (error) {
            alert("Ich lehne aller Zeilen von 'benutzer' ab: " + error.message + " " + error.details);
        }
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
                "kategorien": beitragRow.kategorien,
                "bildUrl": beitragRow.bildURL
            };
            beitraegeAusDB.push(tempBeitrag);
        });
        return beitraegeAusDB;
    }

    async function beitraegeSpeichern() {
        let beitraegeInDB = [];

        beitraege.map((Row) => {
            const tempBeitrag = {
                id: Row.id,
                titel : Row.titel,
                benutzerName : Row.nutzer,
                inhalt: Row.inhalt,
                publizierungsDatum: Row.publizierungsDatum,
                erstellungsDatum: Row.erstellungsDatum,
                kategorien: Row.kategorien,
                bildURL: Row.bildUrl
            };

            beitraegeInDB.push(tempBeitrag);
        })

        const { data, error } = await supabase
            .from('beitraege')
            .upsert(beitraegeInDB)
            .select();

        if (error) {
            alert("Ich lehne aller Zeilen von 'beitraege' ab: " + error.message + " " + error.details);
        }
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

    async function kommentareSpeichern() {
        let kommentareInDB = [];
        kommentare.map((Row) => {
            const tempKommentar = {
                id: Row.id,
                benutzerName: Row.nutzer,
                inhalt: Row.inhalt,
                datum: Row.datum,
                editDatum: Row.editDatum,
                beitragsID: Row.beitragsId,
            };
            kommentareInDB.push(tempKommentar);
        });


        const { data, error } = await supabase
            .from('kommentare')
            .upsert(kommentareInDB)
            .select();

        if (error) {
            alert("Ich lehne aller Zeilen von 'kommentare' ab: " + error.message + " " + error.details);
        }
    }

    async function deleteKommentar(){
        const { data, error } = await supabase
            .from('kommentare')
            .delete()
            .eq('id', kommentarIdFürLöschen)

        if (error) {
            alert("Ich lehne DELETE vom Kommentar ab: " + error.details);
        }
    }

    async function deleteBeitrag(){
        const { data, error } = await supabase
            .from('beitraege')
            .delete()
            .eq('id', beitragIdFürLöschen)

        if (error) {
            alert("Ich lehne DELETE vom Beitrag ab: " + error.details);
        }
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
                                beitragIdFürLöschen={beitragIdFürLöschen}
                                setBeitragIdFürLöschen={setBeitragIdFürLöschen}
                                kommentarIdFürLöschen={kommentarIdFürLöschen}
                                setKommentarIdFürLöschen={setKommentarIdFürLöschen}
                    />}
                </div>
            </div>
            <div className="hero-foot">
                <Footer></Footer>
            </div>
        </section>
    );
}
export default App;

