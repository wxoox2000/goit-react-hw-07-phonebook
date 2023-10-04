const { createSlice, nanoid } = require('@reduxjs/toolkit');
const { Notify } = require('notiflix');


let initContacts = [];
const storedContacts = localStorage.getItem('contacts');
if (storedContacts) {
  const savedContacts = JSON.parse(storedContacts);
  initContacts = savedContacts;
}
 else {
  initContacts = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];
}

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initContacts,
  reducers: {
    addContact: {
      reducer(state, action) {
        const isInList = state.some(({ name }) => name === action.payload.name);
        if (isInList) {
          Notify.failure(`${action.payload.name} is already in contacts.`);
        } else {
          state.push(action.payload);
          Notify.success('Contact added!');
        }
      },
      prepare(obj) {
        return {
          payload: {
            name: obj.name,
            number: obj.number,
            id: nanoid(),
          },
        };
      },
    },
    deleteContact(state, action) {
      return state.filter(contact => contact.id !== action.payload);
    },
  },
});
export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
