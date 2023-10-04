import { fetchContacts, addContactToBase, deleteContactFromBase } from './operations';


const { createSlice, nanoid } = require('@reduxjs/toolkit');
const { Notify } = require('notiflix');

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [], 
    isLoading: false,
    error: null,
  },
  reducers: {
    addContact: {
      reducer(state, action) {
        const isInList = state.items.some(({ name }) => name === action.payload.name);
        if (isInList) {
          Notify.failure(`${action.payload.name} is already in contacts.`);
        } else {
          state.items.push(action.payload);
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
      state.items = state.items.filter(contact => contact.id !== action.payload);
    },
  },
  extraReducers: {
    [fetchContacts.pending](state) {
      state.isLoading = true;
    },
    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [fetchContacts.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    [addContactToBase.pending](state) {
      state.isLoading = true;
    },
    [addContactToBase.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = [...state.items, action.payload];
    },
    [addContactToBase.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    [deleteContactFromBase.pending](state) {
      state.isLoading = true;
    },
    [deleteContactFromBase.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = state.items.filter(contact => contact.id !== action.payload.id);
    },
    [deleteContactFromBase.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },

});
export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
