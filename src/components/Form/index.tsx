'use client'
import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';

// Define interface for form values
interface FormValues {
  email: string;
}

// Validation schema
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
});

const EmailForm = () => {
  const initialValues: FormValues = { email: '' };

  const onSubmit = async (values: FormValues, { setSubmitting, setStatus }: FormikHelpers<FormValues>) => {
    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: values.email }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setStatus({ success: data.message });
    } catch (error) {
      setStatus({ error: 'Error sending email: ' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, status }) => (
        <Form>
          <div>
            <label htmlFor="email">Email Address</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>

          {status && status.success && <div>{status.success}</div>}
          {status && status.error && <div>{status.error}</div>}
        </Form>
      )}
    </Formik>
  );
};

export default EmailForm;
