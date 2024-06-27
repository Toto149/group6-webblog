import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hsyjtnkoizsbrwkgyjid.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzeWp0bmtvaXpzYnJ3a2d5amlkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxOTM4NjMyMywiZXhwIjoyMDM0OTYyMzIzfQ.NNi48gm9BAf1S65ESyFAQbvxeAlhBWvrGe8BzN-N8So";
const supabase = createClient(supabaseUrl, supabaseKey);

function Supabase() {
    const [benutzer, setBenutzer] = useState([]);
    const [rollen, setRollen] = useState([]);
    const [beitraege, setBeitraege] = useState([]);
    const [kommentare, setKommentare] = useState([]);

    useEffect(() => {
        getBenutzer();
        getRollen();
        getBeitraege();
        getKommentare();
    }, []);

    async function getBenutzer() {
        const { data } = await supabase.from("benutzer").select();
        setBenutzer(data);
    }

    async function getRollen() {
        const { data } = await supabase.from("rollen").select();
        setRollen(data);
    }
    async function getBeitraege() {
        const { data } = await supabase.from("beitraege").select();
        setBeitraege(data);
    }
    async function getKommentare() {
        const { data } = await supabase.from("kommentare").select();
        setKommentare(data);
    }



    return (
        <>
            <ul>
                {benutzer.map((benutzerRow) => (
                    <li key={benutzerRow.name}>
                        {benutzerRow.name}
                        {benutzerRow.passwort}
                        {benutzerRow.rolleID}
                        {/*benutzerRow.avatarURL*/}
                        <img src={benutzerRow.avatarURL} style={{width: '32px', height: '32px'}} alt="Avatar"/>
                    </li>
                ))}
            </ul>
            <ul>
                {rollen.map((rollenRow) => (
                    <li key={rollenRow.id}>
                        {rollenRow.id}<span> </span>
                        {rollenRow.name}<span> </span>
                        {rollenRow.kannKommentieren ? "true" : "false"}<span> </span>
                        {rollenRow.kannKommentareLöschen ? "true" : "false"}<span> </span>
                        {rollenRow.kannBeitragLöschen ? "true" : "false"}<span> </span>
                        {rollenRow.kannBeitragVerfassen ? "true" : "false"}<span> </span>
                        {rollenRow.kannBeitragVerändern ? "true" : "false"}<span> </span>
                        {rollenRow.kannRolleÄndern ? "true" : "false"}</li>
                ))}
            </ul>
            <ul>
                {beitraege.map((beitraegeRow) => (
                    <li key={beitraegeRow.id}>
                        {beitraegeRow.id}<br/>
                        {beitraegeRow.titel}<br/>
                        {beitraegeRow.inhalt}<br/>
                        {/*beitraegeRow.kategorien*/}<br/>
                        {beitraegeRow.benutzerName}<br/>
                        {beitraegeRow.erstellungsDatum}<br/>
                        {beitraegeRow.publizierungsDatum}<br/>
                        {/*beitraegeRow.bildURL*/}<br/>
                        <img src={beitraegeRow.bildURL} style={{width: '100px', height: '100px'}} alt="Avatar"/>
                    </li>
                ))}
            </ul>
            <ul>
                {kommentare.map((kommentareRow) => (
                    <li key={kommentareRow.id}>
                        {kommentareRow.id}<br/>
                        {kommentareRow.benutzerName}<br/>
                        {kommentareRow.inhalt}<br/>
                        {kommentareRow.datum}<br/>
                        {kommentareRow.editDatum}<br/>
                        {kommentareRow.beitragsID}<br/>
                    </li>
                ))}
            </ul>
        </>
    )
        ;
}

export default Supabase;