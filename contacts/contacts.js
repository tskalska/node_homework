const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = hideBin(process.argv);

const contactsPath = path.join(__dirname, '..', 'db/contacts.json');

const listContacts = async() => {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
}

const getContactById = async(contactId) => {
    const contacts = await listContacts();
    const contact = contacts.find(item => item.id == contactId)
    return contact;
}

const removeContact = async(contactId) => {
    const contacts = await listContacts();
    const idx = contacts.findIndex(contact => contact.id == contactId);
    if (idx === -1){
        return null;
    }
    const removedContact = contacts[idx];
    const [newListContacts] = contacts.splice(idx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return removedContact;
}

const addContact = async(newData) => {
    const contacts = await listContacts();
    const newContact = {...newData, id: uuidv4()};
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}
