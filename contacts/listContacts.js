const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async() => {
    const constacts = await fs.readFile("contacts.json");
    return constacts;
}


module.exports = listContacts;