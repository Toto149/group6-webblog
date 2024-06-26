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

export const administrator = {
    id: 1,
    name: "Admin",
    passwort: "0000",
    avatar: "",
    rolle: admin
}

export const benutzer = {
    id: Date.now(),
    name: "user" + Date.now(),
    passwort: "",
    avatar: "",
    rolle: registrierterBenutzer
}

export let benutzer1 = {
    id: 10,
    name: "user1",
    passwort: "0000",
    avatar: "",
    rolle: registrierterBenutzer
}

export let benutzer2 = {
    id: 20,
    name: "user2",
    passwort: "0000",
    avatar: "",
    rolle: registrierterBenutzer
}

export let benutzer3 = {
    id: 30,
    name: "user3",
    passwort: "0000",
    avatar: "",
    rolle: registrierterBenutzer
}





