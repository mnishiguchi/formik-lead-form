import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import _ from 'lodash';
import Yup from 'yup';
import {
  Button,
  Input,
  Textarea,
  Control,
  Icon,
  Checkbox,
  Notification
} from 'reactbulma';
import FormErrorMessage from './FormErrorMessage';

// https://github.com/jaredpalmer/formik
// https://kulakowka.github.io/react-bulma
// https://bulma.io/documentation/form/general/
const InnerForm = props => {
  const {
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset
  } = props;

  return (
    <form
      onSubmit={handleSubmit}
      onKeyPress={event => event.which === 13 && event.preventDefault()}
    >
      <Control hasIconsRight>
        <Input
          type="name"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.name && touched.name ? 'is-danger' : ''}
        />
        <Icon right>
          <i className="fa fa-user" />
        </Icon>
      </Control>

      <Control hasIconsRight>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.email && touched.email ? 'is-danger' : ''}
        />
        <Icon right>
          <i className="fa fa-envelope" />
        </Icon>
      </Control>

      <Control hasIconsRight>
        <Input
          type="phone"
          name="phone"
          placeholder="Phone"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.phone && touched.phone && 'is-danger'}
        />
        <Icon right>
          <i className="fa fa-phone" />
        </Icon>
      </Control>

      <Textarea
        type="message"
        name="message"
        placeholder="Enter your message"
        value={values.message}
        onChange={handleChange}
        onBlur={handleBlur}
        className={errors.message && touched.message && 'is-danger'}
        rows={2}
      />

      <Checkbox
        name="subscribe"
        value={values.subscribe}
        onChange={handleChange}
        onBlur={handleBlur}
        defaultChecked={true}
        className={errors.subscribe && touched.subscribe && 'is-danger'}
      >
        Update me with the latest apartments and specials.
      </Checkbox>

      {
        <div style={{ margin: '1rem 0' }}>
          <FormErrorMessage errors={errors} touched={touched} />
        </div>
      }

      <div>
        <Button onClick={handleReset} disabled={!dirty || isSubmitting}>
          Reset
        </Button>
        <Button success disabled={isSubmitting}>
          Contact Property
        </Button>
      </div>

      <Notification>
        <Button
          onClick={e => {
            e.preventDefault();
            localStorage.clear();
          }}
        >
          Clear local storage
        </Button>
      </Notification>
    </form>
  );
};

const FormikLeadForm = withFormik({
  mapPropsToValues: () => {
    const storedValues = JSON.parse(localStorage.getItem('contactForm')) || {};
    return {
      name: storedValues.name || '',
      email: storedValues.email || '',
      phone: '',
      message: '',
      subscribe: true
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required')
  }),
  handleSubmit: (values, { setSubmitting, setFieldError }) => {
    // Simulate async request
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      localStorage.setItem(
        'contactForm',
        JSON.stringify(_.pick(values, ['name', 'email']))
      );

      setSubmitting(false);
    }, 500);
  },
  displayName: 'FormikLeadForm' // helps with React DevTools
})(InnerForm);

export default FormikLeadForm;
