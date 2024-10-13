import type { Contact } from './App.tsx';

interface ContactListProps {
  contacts: Contact[];
  handleEdit: (contact: Contact) => void;
  handleDelete: (id: string) => void;
}

function ContactList({ contacts, handleEdit, handleDelete }: ContactListProps) {
  return (
    <div>
      {contacts.map((contact) => {
        return (
          <Contact
            key={contact.id}
            contact={contact}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        );
      })}
    </div>
  );
}

interface ContactProps {
  contact: Contact;
  handleEdit: (contact: Contact) => void;
  handleDelete: (id: string) => void;
}

function Contact({ contact, handleEdit, handleDelete }: ContactProps) {
  const { id, name, city } = contact;

  return (
    <article>
      <h3>{name}</h3>
      <p>
        <em>City:</em> <span>{city}</span>
      </p>
      <div>
        <button onClick={() => handleEdit(contact)}>Edit</button>
        <button onClick={() => handleDelete(id)}>Delete</button>
      </div>
    </article>
  );
}

export default ContactList;
