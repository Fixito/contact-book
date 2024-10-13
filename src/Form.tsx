import { useEffect, useRef } from 'react';
import type { Contact, ContactWithoutId } from './App';

interface FormProps {
  isEditing: boolean;
  editedPerson: Contact | null;
  reset: () => void;
  addContact: (data: ContactWithoutId) => void;
  editContact: (data: ContactWithoutId) => void;
}

function Form({
  addContact,
  editContact,
  isEditing,
  editedPerson,
  reset,
}: FormProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formaData = new FormData(form);
    const data = Object.fromEntries(formaData) as unknown as ContactWithoutId;
    if (!data.name || !data.city) return;

    if (!isEditing) {
      addContact(data);
    } else {
      editContact(data);
    }

    form.reset();
    reset();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [isEditing]);

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add a new contact</h1>
      <label htmlFor='name'>Name: </label>
      <input
        ref={inputRef}
        type='text'
        name='name'
        id='name'
        defaultValue={isEditing ? editedPerson?.name : ''}
      />{' '}
      <label htmlFor='city'>City: </label>
      <input
        type='text'
        name='city'
        id='city'
        defaultValue={isEditing ? editedPerson?.city : ''}
      />
      <button>{!isEditing ? 'Add contact' : 'Edit contact'}</button>
      {isEditing && <button onClick={reset}>Cancel</button>}
    </form>
  );
}

export default Form;
