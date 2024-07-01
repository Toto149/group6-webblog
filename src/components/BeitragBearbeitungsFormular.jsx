import {useState} from "react";
import PropTypes from "prop-types";

export default function BeitragBearbeitenFormular({
                                                        beitraege,
                                                        setBeitraege,
                                                        beitrag,
                                                        setWurdeEditGeklickt,
                                                        setWurdeSubmitet,
                                                    }
) {
    //Diese useStates sind wichtig, damit diese Component up to date bleibt.
    const [lokalerTitel, setLokalerTitel] = useState(beitrag.titel);
    const [lokaleKategorie, setLokaleKategorie] = useState(beitrag.kategorien);
    const [lokalerTextInhalt, setLokalerTextInhalt] = useState(beitrag.inhalt);
    const [lokaleBildUrl, setLokaleBildUrl] = useState(beitrag.bildUrl);

    const hantiereSubmit =  () => {

        setWurdeSubmitet(true)
        const neuerBeitrag = {
            ...beitrag,
            "titel" : lokalerTitel,
            "inhalt": lokalerTextInhalt,
            "publizierungsDatum": Date.now(),
            "kategorien": [lokaleKategorie],
            "bildUrl": lokaleBildUrl,
        };

        const tempBeitraege= beitraege.filter(b => b.id !== beitrag.id)
        setBeitraege([...tempBeitraege, neuerBeitrag]);
        setWurdeEditGeklickt(false);
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

    const hantiereVeraenderungBildUrl = (event) => {
        setLokaleBildUrl(event.target.value)
    }



    return (
        <div className="field m-1" style={{textAlign: "left"}}>
                        <form onSubmit={hantiereSubmit}>

                            <label className="label has-text-black">
                                Titel des Beitrags: {" "}
                            <input
                                onChange={hantiereVeraenderungTitel}
                                id={"beitragsTitel"}
                                type={"text"}
                                className="input is-info"
                                value={lokalerTitel}
                            />
                            </label>

                            <label className="label has-text-black">
                                Textinhalt des Beitrags: {" "}
                            <textarea
                                onChange={hantiereVeraenderungText}
                                    id={"textInhalt"}
                                className="textarea is-info"
                                value={lokalerTextInhalt}
                            />
                            </label>

                            <label className="label has-text-black">
                                Kategorie des Beitrags: {" "}
                            <input
                                onChange={hantiereVeraenderungKategorie}
                                id={"kategorie"}
                                type={"text"}
                                className="input is-info"
                                value={lokaleKategorie}
                            />

                            </label>
                            <label className="label has-text-black">
                                Url des Bildes: {" "}
                            <input
                                    onChange={hantiereVeraenderungBildUrl}
                                    value={beitrag.bildUrl}
                                   className="input is-dark"
                                   type="text"
                                   id="bildUrl"

                            />
                                </label>
                            <button className="button is-dark m-2">Submit</button>

                    </form>
        </div>
    );



}

BeitragBearbeitenFormular.propTypes = {
    beitraege: PropTypes.array.isRequired,
    setBeitraege: PropTypes.func.isRequired,
    beitrag: PropTypes.object.isRequired,
    setWurdeSubmitet: PropTypes.func.isRequired,
    setWurdeEditGeklickt: PropTypes.func.isRequired
}