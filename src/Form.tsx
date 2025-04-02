import { useEffect, useRef } from "react";
import type { Contact, ContactWithoutId } from "./App";

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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 rounded-lg bg-white p-12 lg:flex-row"
    >
      <label htmlFor="name" className="input">
        <span className="label">Name:</span>
        <input
          ref={inputRef}
          type="text"
          name="name"
          id="name"
          defaultValue={isEditing ? editedPerson?.name : ""}
        />
      </label>
      <label htmlFor="city" className="input">
        <span className="label">City:</span>
        <input
          type="text"
          name="city"
          id="city"
          className="input"
          defaultValue={isEditing ? editedPerson?.city : ""}
        />
      </label>
      <div className="space-x-2">
        <button className="btn btn-primary">
          {!isEditing ? "Add Contact" : "Save"}
        </button>
        {isEditing && (
          <button onClick={reset} className="btn btn-ghost">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default Form;
