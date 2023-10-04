import { Formik } from 'formik';
import { PhonebookForm, FormItem, Error, Input, AddBtn } from './ContactForm.styled';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addContact } from 'Redux/contactsSlice';

export const ContactForm = () => {
    const SignupSchema = Yup.object().shape({
      name: Yup.string()
        .matches(
          /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
          "Name may contain only letters, apostrophe, dash and spaces. For example Charles de Batz de Castelmore d'Artagnan"
        )
        .required('Required'),
      number: Yup.string()
        .matches(
          /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
          'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
        )
        .required('Required'),
    });
    const dispatch = useDispatch();
    return (
      <Formik
        initialValues={{
          name: '',
          number: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(obj, actions) => {
          dispatch(addContact(obj));
          actions.resetForm();
        }}
      >
        <PhonebookForm>
          <FormItem>
            Name
            <Input name="name" />
          </FormItem>
          <Error component="span" name="name" />
          <FormItem>
            Phone number
            <Input name="number" />
          </FormItem>
          <Error component="span" name="number" />
          <AddBtn type="submit">Add contact</AddBtn>
        </PhonebookForm>
      </Formik>
    );
}
