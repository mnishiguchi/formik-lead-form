import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import Yup from 'yup';
import { Button, Input, Level, Textarea, Control, Icon } from 'reactbulma';
import FormErrorMessage from './FormErrorMessage';

// https://github.com/jaredpalmer/formik
// https://react.semantic-ui.com/collections/form#form-example-subcomponent-control
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
          placeholder="Enter your name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.name && touched.name ? 'is-danger' : ''}
        />
        <Icon right>
          <i className="fa fa-home" />
        </Icon>
      </Control>

      <Control hasIconsRight>
        <Input
          type="email"
          name="email"
          placeholder="Enter your email"
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
          placeholder="Enter your phone"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.phone && touched.phone && 'is-danger'}
        />
        <Icon right>
          <i className="fa fa-phone" />
        </Icon>
      </Control>

      <div className="control is-expanded">
        <span className="select">
          <select name="moveIn" value={values.moveIn} onChange={handleChange}>
            <option>Move in</option>
            <option value="1">Immediately</option>
            <option value="2">In 2 weeks</option>
            <option value="4">In a month</option>
            <option value="12">In 3 months</option>
          </select>
        </span>
      </div>

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

      {
        <div style={{ margin: '1rem 0' }}>
          <FormErrorMessage errors={errors} touched={touched} />
        </div>
      }

      <Button onClick={handleReset} disabled={!dirty || isSubmitting}>
        Reset
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        Sign Up
      </Button>
    </form>
  );
};

const FormikLeadForm = withFormik({
  mapPropsToValues: () => ({
    name: '',
    email: '',
    phone: '',
    moveIn: '',
    message: ''
  }),
  validationSchema: Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required')
  }),
  handleSubmit: (values, { setSubmitting, setFieldError }) => {
    // Rails wants all the fields to have rails-compatible field names.
    const params = { ...values, move_date: values.moveIn };

    // Simulate async request
    setTimeout(() => {
      // TODO: Replace this with axios or fetch.
      alert(JSON.stringify(params, null, 2));

      setSubmitting(false);
    }, 500);
  },
  displayName: 'FormikLeadForm' // helps with React DevTools
})(InnerForm);

export default FormikLeadForm;
