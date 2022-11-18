import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';
import { contactsSelector } from 'Redux/selectors/selectors';
import { Button, Container, Input, Label } from './ContactForm.styled';
import { addContacts } from '../../Redux/contactsOperation/contactOperations';

export function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const dispatch = useDispatch();
  const contacts = useSelector(contactsSelector);

  const onHandleSubmit = e => {
    e.preventDefault();
    contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase())
      ? Notify.failure(`${name} is already in contacts`)
      : dispatch(addContacts({ name, phone, id: nanoid() }));
    setName('');
    setPhone('');
  };

  return (
    <Container onSubmit={onHandleSubmit}>
      <Label>
        name
        <Input
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={e => setName(e.target.value)}
        />
      </Label>
      <Label htmlFor="">
        phone
        <Input
          type="tel"
          name="phone"
          value={phone}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={e => setPhone(e.target.value)}
        />
      </Label>
      <Button type="submit">add contact</Button>
    </Container>
  );
}
