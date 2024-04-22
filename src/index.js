const Contacts = require("./contacts");
const { program } = require("commander");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id: userID, name, email, phone }) {
    try {
        switch (action) {
        case "list":
            const contacts = await Contacts.getContacts();
            console.table(contacts);
        break;
        case "get":
            const contact = await Contacts.getContactById(userID);
            console.log(contact);
        break;

        case "add":
            const addedContact = await Contacts.addContact( name, email, phone );
            console.log(addedContact);
        break;

        case "remove":
            const removedContacts = await Contacts.removeContact(userID);
            console.log(removedContacts);
        break;

        default:
        console.warn("\x1B[31m Unknown action type!");
    };   
    } catch (error) {
        console.error("\x1B[31m Error", error.message);
        
    };  
}

invokeAction(options);