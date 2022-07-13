import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleChangeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  handleSubmit = ({ name, number }) => {
    const { contacts } = this.state;
    const addedName = contacts.find(item => item.name === name);
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
      : this.setState(prevState => ({
          contacts: [contact, ...prevState.contacts],
        }));
  };

  handleDelete = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(item => item?.id !== id),
      };
    });
  };

  handleFilter = e => {
    const { value } = e.currentTarget;
    this.setState({
      filter: value,
    });
  };

  componentDidMount() {
    // console.log('componentDidMount');
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    // console.log('parsedContacts', parsedContacts);
    if (parsedContacts) {
      this.setState({
        contacts: parsedContacts,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log(
    //   'componentDidUpdate',
    //   'prevProps',
    //   prevProps,
    //   'prevState',
    //   prevState.contacts,
    //   'this.state',
    //   this.state.contacts
    // );

    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  render() {
    const { contacts, filter } = this.state;
    const { handleSubmit, handleDelete, handleFilter } = this;

    const normalized = filter.toLowerCase();
    const filteredContacts = contacts.filter(item =>
      item.name.toLowerCase().includes(normalized)
    );
    // console.log('contacts', contacts);
    // console.log('filteredContacts', filteredContacts);

    // const localContacts = localStorage.getItem('contacts');

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
  }
}
