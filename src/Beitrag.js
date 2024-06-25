import {administrator} from "./Benutzer";


export let kommentar = {
    "id": "234234",
    "nutzer": administrator,
    "inhalt": "Hallo ich bin ein Kommentar",
    "datum" : new Date(),
    "editDatum" : {},
    "beitragsId" : "1"
};
export let beitrag = {
    "id": "1",
    "titel" : "Hallo Welt1",
    "nutzer": administrator,
    "inhalt": "Hallo wie geht es euch?1",
    "publizierungsDatum" : {},
    "erstellungsDatum" : new Date("2023-06-24T12:48:58.996Z"),
    "kommentare" : [],
    "kategorien" : ["Neues von der Welt","Sport"],
};

export let beitrag2 = {
    "id": "2",
    "titel" : "Hallo Welt2",
    "nutzer": administrator,
    "inhalt": "Hallo wie geht es euch?2",
    "publizierungsDatum" : {},
    "erstellungsDatum" : new Date(),
    "kommentare" : [],
    "kategorien" : ["Sport"],
}

export let beitraege = [];
export let kommentare = [];