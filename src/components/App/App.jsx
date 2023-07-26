import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import CanvasAnimation from '../CanvasAnimation/CanvasAnimation';
import { useEffect, useState } from 'react';
import { addContact, deleteContact } from 'Redux/Slices';
import { Container, Wrapper, Title, SubTitle } from './App.styled';
import { useDispatch, useSelector } from 'react-redux';
import { getContact } from '../../Redux/selectors';

const App = () => {
  const contact = useSelector(getContact) || [];
  const [filter, setFilter] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');

    if (storedContacts) {
      // Set the state directly with the data obtained from localStorage
      dispatch(addContact(JSON.parse(storedContacts)));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contact));
  }, [contact]);

  const addNewContact = newContact => {
    const isContactInList = contact.some(
      ({ name }) => name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (isContactInList) {
      alert(`${newContact.name} already exists in contacts`);
      return;
    }

    // If the contact doesn't exist, dispatch the addContact action
    dispatch(addContact(newContact.name, newContact.number));
  };

  const changeFilter = e => {
    setFilter(e.target.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contact.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const visibleContacts = getVisibleContacts();

  const removeContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  return (
    <Container>
      <CanvasAnimation />
      <Title>Phone Book</Title>

      <ContactForm onSubmit={addNewContact} />

      <SubTitle>Contacts</SubTitle>
      {contact.length > 0 ? (
        <Filter value={filter} onChangeFilter={changeFilter} />
      ) : (
        <Wrapper>Your phone book is empty. Add the first contact!</Wrapper>
      )}
      {contact.length > 0 && (
        <ContactList
          contacts={visibleContacts}
          onRemoveContact={removeContact}
        />
      )}
    </Container>
  );
};

export default App;
