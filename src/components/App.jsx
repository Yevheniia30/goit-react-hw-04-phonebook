import { useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';
import { useLocalStorage } from 'hooks/useLocalStorage';

export const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', []);

  const [filter, setFilter] = useState('');

  const handleSubmit = ({ name, number }) => {
    // const { contacts } = this.state;
    const addedName = contacts.find(
      item => item.name.toLowerCase() === name.toLowerCase()
    );
    const addedNumber = contacts.find(item => item.number === number);

    const contact = {
      id: nanoid(4),
      name,
      number,
    };

    addedName
      ? alert(`${name} is already in contacts with number ${addedName.number}`)
      : addedNumber
      ? alert(`${number} is already in contacts as ${addedNumber.name}`)
      : !name || !number
      ? alert('Сomplete all fields')
      : setContacts(prevState => [contact, ...prevState]);
  };

  const handleDelete = id => {
    setContacts(contacts.filter(item => item?.id !== id));
  };

  const handleFilter = e => {
    const { value } = e.currentTarget;
    setFilter(value);
  };

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    } else {
      // console.log('filter filtered');
      const normalized = filter.toLowerCase();

      return contacts.filter(item =>
        item.name.toLowerCase().includes(normalized)
      );
    }
  };

  const filteredContacts = getFilteredContacts();
  // console.log('filteredContacts', filteredContacts);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center',
        // fontSize: 40,
        // fontSize: 40,
        color: '#010101',
        paddingTop: '30px',
      }}
    >
      <ContactForm onSubmit={handleSubmit} />
      <Filter filter={filter} onFilter={handleFilter} />
      <ContactList contacts={filteredContacts} onDelete={handleDelete} />
    </div>
  );
};
