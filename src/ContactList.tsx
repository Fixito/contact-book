import type { Contact } from "./App.tsx";

interface ContactListProps {
  contacts: Contact[];
  handleEdit: (contact: Contact) => void;
  handleDelete: (id: string) => void;
}

function ContactList({ contacts, handleEdit, handleDelete }: ContactListProps) {
  return (
    <div className="grid grid-cols-1 gap-6 py-20 md:grid-cols-2 lg:grid-cols-3">
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
    <article className="card bg-base-100 shadow-sm">
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p className="capitalize">{city}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary"
            onClick={() => handleEdit(contact)}
          >
            Edit
          </button>
          <button className="btn btn-ghost" onClick={() => handleDelete(id)}>
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

export default ContactList;
