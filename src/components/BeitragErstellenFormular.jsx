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
    const [bildUrl, setBildUrl] = useState("");
    const hantiereSubmit =  () => {


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
        setBeitraege(() => [...beitraege, neuerBeitrag]);

    }


    const hantiereVeraenderungTitel = (event) => {
        setTitel(event.target.value);
    }
    const hantiereVeraenderungText = (event) => {
        setTextInhalt(event.target.value);
    }
    const hantiereVeraenderungKategorie = (event) => {
        setKategorie([event.target.value]);
    }
    const hantiereVeraenderungbildUrl = (event) => {
        setBildUrl(event.target.value);
    }




    return (
        <div className="field">

            <form onSubmit={hantiereSubmit}>

                <label className="label is-info" style={{color: "ghostwhite", textAlign:"left"}} >Titel des Beitrags:</label>

                <input
                    className="input is-info"
                    onChange={hantiereVeraenderungTitel}
                    placeholder={"Titel"}
                    id={"beitragsTitel"}
                    type={"text"}
                                    />

                <label className="label is-info" style={{color: "ghostwhite", textAlign:"left"}}>Textinhalt des Beitrags:</label>

                <textarea
                    onChange={hantiereVeraenderungText}
                    id={"textInhalt"}
                    className="textarea is-info"
                    placeholder={"Beitragstext"}
                />

                <label className="label is-info" style={{color: "ghostwhite", textAlign:"left"}}>Kategorie des Beitrags:</label>

                <input
                    className="input is-info"
                    onChange={hantiereVeraenderungKategorie}
                    id={"kategorie"}
                    placeholder={"Kategorien des Textes betreffend e.g. Sprachen, Informatik"}
                    type={"text"}
                />

                <label className="label is-info" style={{color: "ghostwhite", textAlign:"left"}} >Bild Url für das Bild des Artikels:</label>

                <input
                    className="input is-info"
                    onChange={hantiereVeraenderungbildUrl}
                    id={"bildUrl"}
                    placeholder={"Url des Bildes e.g. www.asdasdasdasd.com/asdasd.jpg"}
                    type={"text"}
                />
                <button
                    className="button is-info m-2"
                    style={{
                    marginTop: "5px"
                    }}
                >
                    Submit
                </button>
            </form>
        </div>
    );



}