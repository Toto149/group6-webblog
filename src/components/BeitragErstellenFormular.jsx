import {useState} from "react";

export default function BeitragErstellenFormular({
                                                     aktuellerBenutzer,
                                                     beitraege,
                                                     setBeitraege
                                                 }
                                                ) {
    const [titel, setTitel] = useState("");
    const [textInhalt, setTextInhalt] = useState("");
    const [kategorie, setKategorie] = useState("");
    const hantiereSubmit =  () => {


        const neuerBeitrag = {
            "id": Date.now().toString(),
            "titel" : titel,
            "nutzer" : aktuellerBenutzer,
            "inhalt": textInhalt,
            "publizierungsDatum": new Date(),
            "erstellungsDatum": new Date(),
            "kommentare" : [],
            "kategorien": [kategorie]
        };
        setBeitraege(() => [...beitraege, neuerBeitrag]);

    }


    const hantiereVeraenderungTitel = (event) => {
        event.preventDefault();
        setTitel(event.target.value);
    }
    const hantiereVeraenderungText = (event) => {
        setTextInhalt(event.target.value);
    }
    const hantiereVeraenderungKategorie = (event) => {
        setKategorie([event.target.value]);
    }





    return (
        <div style={{alignSelf: "center", marginBottom: "20px"}}>

            <form onSubmit={hantiereSubmit}>

                <label > Titel des Beitrags:</label>
                <input onChange={hantiereVeraenderungTitel} id={"beitragsTitel"} type={"text"} style={{display: "block", width: "39em"}}/>
                <label>Textinhalt des Beitrags</label>
                <textarea onChange={hantiereVeraenderungText} id={"textInhalt"} style={{width: "40em", height: "20em",display: "block"}} ></textarea>
                <label>Kategorie des Beitrags</label>
                <input onChange={hantiereVeraenderungKategorie} id={"kategorie"} type={"text"} style={{display: "block", width:"39em"}}/>
                <button style={{marginTop: "5px"}}>Submit</button>

            </form>
        </div>
    );



}