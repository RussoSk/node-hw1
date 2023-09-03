const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  const response = await fs.readFile(contactsPath);
  return JSON.parse(response);
}

async function getContactById(contactId) {
  const data = await listContacts();
  const findContact = data.find((option) => option.id === contactId);
  return findContact || null;
}

async function removeContact(contactId) {
  const data = await listContacts();
  const findContactIndex = data.findIndex((option) => option.id === contactId);

  if (findContactIndex === -1) {
    return null;
  }

  const getResult = data.splice(findContactIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));

  return getResult;
}

async function addContact(name, email, phone) {
  const data = await listContacts();
  const newContact = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone,
  };

  data.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};