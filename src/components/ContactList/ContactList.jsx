import { useDispatch, useSelector } from 'react-redux';
import { Contact, DeleteBtn, List } from './ContactList.styled';
import { getContacts, getFilter } from 'Redux/selectors';
import { Notify } from 'notiflix';
import { deleteContact } from 'Redux/contactsSlice';

export const ContactList = () => {
    const contactsList = (contacts, filter) => {
        if(filter ==='') {
            return contacts;
        }
        return contacts.filter(contact => {
            return contact.name
              .concat(contact.number)
              .toLowerCase()
              .includes(filter.toLowerCase());
          })
    }
    const contacts = useSelector(getContacts);
    const filter = useSelector(getFilter);
    const contactsToRender = contactsList(contacts, filter);
    const dispatch = useDispatch();
    const onDelete = e => {
        dispatch(deleteContact(e.target.id))
        Notify.info('Contact deleted!');
      };
    
    return <List>
        {contactsToRender.map((contact) => {
            return(
                <Contact key={contact.id}>
                    <p>{contact.name}: {contact.number}</p>
                    <DeleteBtn id={contact.id} onClick={onDelete}>Delete</DeleteBtn>
                </Contact>
            )
        })}
    </List>;
}
