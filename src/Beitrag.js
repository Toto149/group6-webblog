import {administrator, benutzer} from "./Benutzer";


export let kommentar = {
    "id": "234234",
    "nutzer": {administrator},
    "inhalt": "Hallo ich bin ein Kommentar",
    "datum" : new Date(),
    "editDatum" : {},
    "beitragsId" : "1"
};
export let beitrag = {
    "id": "1",
    "titel" : "Hallo Welt",
    "nutzer": administrator,
    "inhalt": "Hallo wie geht es euch?",
    "publizierungsDatum" : {},
    "erstellungsDatum" : new Date(),
    "kommentare" : [kommentar],
    "kategorien" : ["Neues von der Welt"],
};




export let beitraege = [beitrag];
export let kommentare = [];