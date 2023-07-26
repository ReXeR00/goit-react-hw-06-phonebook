import { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { Form, Label, Input, Button } from './ContactForm.styled';
import { addContact } from 'Redux/Slices';
import { useDispatch } from 'react-redux';

const ContactForm = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const [contact, setContact] = useState({
    name: '',
    number: '',
  });

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    dispatch(addContact(form.elements.name.value, form.elements.number.value));

    form.reset();
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setContact(prevContact => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor={nameInputId}>
        Name
        <Input
          type="text"
          name="name"
          value={contact.name}
          onChange={handleChange}
          required
        />
      </Label>

      <Label htmlFor={numberInputId}>
        Number
        <Input
          type="tel"
          name="number"
          value={contact.number}
          onChange={handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </Label>

      <Button type="submit">Add contact</Button>
    </Form>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
