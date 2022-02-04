const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const Todo = require('./contacts/contacts');

const invokeAction = async({ action, id, name, email, phone }) => {
    switch (action) {
      case 'list':
        const contacts = await Todo.listContacts();
        console.log(contacts);
        break;
  
      case 'get':
        const contact = await Todo.getContactById(id);
            if(!contact){
                throw new Error(`Contact with id ${id} not found`);
            }
         console.log('ja naszel', contact);
        break;
  
      case 'add':
        const newContacts = await Todo.addContact({name, email, phone});
        console.log(newContacts);
        break;
  
      case 'remove':
        removedContact = await Todo.removeContact(id);
        console.log(removedContact);
        break;
  
      default:
        console.warn('\x1B[31m Unknown action type!');
    }
  }

const argv = yargs(hideBin(process.argv)).argv

invokeAction(argv);