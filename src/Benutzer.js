


export const admin = {
    kannKommentieren: true,
    kannKommentareLöschen: true,
    kannBeitragLöschen: true,
    kannBeitragVerfassen: true,
    kannBeitragVerändern: true,
    kannRolleÄndern: true
}

export const registrierterBenutzer = {
    kannKommentieren: true,
    kannKommentareLöschen: false,
    kannBeitragLöschen: false,
    kannBeitragVerfassen: false,
    kannBeitragVerändern: false,
    kannRolleÄndern: false
}

export const moderator = {
    kannKommentieren: true,
    kannKommentareLöschen: true,
    kannBeitragLöschen: false,
    kannBeitragVerfassen: false,
    kannBeitragVerändern: false,
    kannRolleÄndern: false
}

export let administrator = {
    id: 1,
    name: "Admin",
    passwort: "0000",
    avatar: "",
    role: admin
}

export let benutzer = {
    id: Date.now(),
    name: "user" + Date.now(),
    passwort: "",
    avatar: "",
    role: registrierterBenutzer
}

export let benutzer1 = {
    id: 10,
    name: "user1",
    passwort: "0000",
    avatar: "",
    role: registrierterBenutzer
}

export let benutzer2 = {
    id: 20,
    name: "user2",
    passwort: "0000",
    avatar: "",
    role: registrierterBenutzer
}

export let benutzer3 = {
    id: 30,
    name: "user3",
    passwort: "0000",
    avatar: "",
    role: registrierterBenutzer
}





