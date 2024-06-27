import {useState} from "react";

export default function BeitragBearbeitenFormular({
                                                        beitraege,
                                                        setBeitraege,
                                                        beitrag,
                                                        setWurdeSubmitet,
                                                    }
) {
    //Diese useStates sind wichtig, damit diese Component up to date bleibt.
    const [lokalerTitel, setLokalerTitel] = useState(beitrag.titel);
    const [lokaleKategorie, setLokaleKategorie] = useState(beitrag.kategorien.toString());
    const [lokalerTextInhalt, setLokalerTextInhalt] = useState(beitrag.inhalt);

    const hantiereSubmit =  () => {

        setWurdeSubmitet(true)
        const neuerBeitrag = {
            ...beitrag,
            "titel" : lokalerTitel,
            "inhalt": lokalerTextInhalt,
            "publizierungsDatum": new Date(),
            "kategorien": [lokaleKategorie]
        };

        const tempBeitraege= beitraege.filter(b => b.id !== beitrag.id)
        setBeitraege([...tempBeitraege, neuerBeitrag]);

    }


    const hantiereVeraenderungTitel = (event) => {
        setLokalerTitel(event.target.value)
    }
    const hantiereVeraenderungText = (event) => {
        setLokalerTextInhalt(event.target.value);

    }
    const hantiereVeraenderungKategorie = (event) => {
        setLokaleKategorie(event.target.value);
    }





    return (
        <div className="card-large is-7" style={{alignSelf: "center", marginBottom: "20px"}}>
            <div className="card-content">
            <form onSubmit={hantiereSubmit}>

                <label > Titel des Beitrags:</label>
                <input
                    onChange={hantiereVeraenderungTitel}
                    id={"beitragsTitel"}
                    type={"text"}
                    className="input is-info"
                    value={lokalerTitel}
                />
                <label>Textinhalt des Beitrags</label>
                <textarea
                    onChange={hantiereVeraenderungText}
                    id={"textInhalt"}
                    className="textarea is-info"
                    value={lokalerTextInhalt}
                />

                <label>Kategorie des Beitrags</label>
                <input
                    onChange={hantiereVeraenderungKategorie}
                    id={"kategorie"}
                    type={"text"}
                    className="input is-info"
                    value={lokaleKategorie}
                />
                <button style={{marginTop: "5px"}}>Submit</button>

            </form>
            </div>
        </div>
    );



}