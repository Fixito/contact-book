import { useState } from "react";
import ContactList from "./ContactList.tsx";
import Form from "./Form.tsx";
import Hero from "./Hero.tsx";

export interface ContactWithoutId {
  name: string;
  city: string;
}

export interface Contact extends ContactWithoutId {
  id: string;
}

function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPerson, setEditedPerson] = useState<Contact | null>(null);

  const addContact = (data: ContactWithoutId) => {
    const id = new Date().getTime().toString();
    const newContact = { ...data, id };
    setContacts([...contacts, newContact]);
  };

  const editContact = (data: ContactWithoutId) => {
    const newContacts = contacts.map((contact) =>
      contact.id === editedPerson?.id ? { ...contact, ...data } : contact,
    );
    setContacts(newContacts);
  };

  const reset = () => {
    setIsEditing(false);
    setEditedPerson(null);
  };

  const handleDelete = (id: string) => {
    const newContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(newContacts);
    reset();
  };

  const handleEdit = (person: Contact) => {
    setIsEditing(true);
    setEditedPerson(person);
  };

  return (
    <main className="mx-auto min-h-dvh max-w-7xl px-2 sm:px-6 lg:px-8">
      <Hero />
      <Form
        isEditing={isEditing}
        editedPerson={editedPerson}
        addContact={addContact}
        editContact={editContact}
        reset={reset}
      />
      <ContactList
        contacts={contacts}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </main>
  );
}

export default App;
