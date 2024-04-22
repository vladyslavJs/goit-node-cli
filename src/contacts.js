const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.resolve("db", "contacts.json");

async function listContacts() {
    const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
    return JSON.parse(data);
}

async function writeContacts(contacts) {
    return fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

async function getContacts() {
    const contacts = await listContacts();

    return contacts;
}

async function getContactById(contactId) {
    const contacts = await listContacts();

    const contact = contacts.find((contact) => contact.id === contactId);
    if (typeof contact === "undefined") {
        return null;
    }
    return contact;
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);

    if (index === -1) {
        return null;
    }

    const removeContact = contacts[index];

    contacts.splice(index, 1);
    await writeContacts(contacts);

    return removeContact;
}

async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = {
        id: crypto.randomUUID(),
        name: name,
        email: email,
        phone: phone
    };

    await writeContacts([...contacts, newContact]);
    return newContact;
}

module.exports = {
    listContacts,
    writeContacts,
    getContacts,
    getContactById,
    addContact,
    removeContact
};