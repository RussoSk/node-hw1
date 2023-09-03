const contactFunctions = require("./contacts");
const { Command } = require('commander');
const program = new Command();

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
      case "list":
        const getAllContacts = await contactFunctions.listContacts();
        console.log(getAllContacts);
        break;
  
      case "get":
        const getContactbyId = await contactFunctions.getContactById(id);
        console.log(getContactbyId);
        break;
  
      case "add":
        const contactAdd = await contactFunctions.addContact(name, email, phone);
        console.log(contactAdd);
        break;
  
      case "remove":
        const contactRemove = await contactFunctions.removeContact(id);
        console.log(contactRemove);
        break;
  
      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  }
  invokeAction(argv);