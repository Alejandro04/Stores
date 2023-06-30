import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { QueryClientProvider, useMutation, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Link from 'next/link';

const queryClient = new QueryClient()

type Item = {
  name?: string;
  description?: string;
  price?: string;
  quantity?: string;
}

type FormValues = {
  name: string;
  description: string;
  email: string;
  items: Item[];
};

const storeSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  errosItems: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required('Item name is required'),
        description: Yup.string().required('Item description is required'),
        price: Yup.number().required('Item price is required').positive('Price must be positive'),
        quantity: Yup.number().required('Item quantity is required').integer('Quantity must be an integer').positive('Quantity must be positive'),
      })
    )
    .min(1, 'At least one item must be added'),
});

const useCreateStore = () => {
  const mutation = useMutation((data: FormValues) => {
    const { name, description, email, items } = data;
    const payload = {
      name,
      description,
      email,
      items: []
    };

    return fetch('/api/stores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(res => res.json());
  });

  return mutation;
};


const FormCreateStore: React.FC = () => {
  const mutation = useCreateStore();

  return (
    <div className="container mx-auto mt-8">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1 className="text-3xl font-bold mb-4">Create Store</h1>
        <div>
          <Link href='/store' className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Back
          </Link>
        </div>
      </div>
      <Formik<FormValues>
        initialValues={{
          name: '',
          description: '',
          email: '',
          items: [{ name: '', description: '', price: '', quantity: '' }],
        }}
        validationSchema={storeSchema}
        onSubmit={(values, { resetForm }) => {
          mutation.mutate(values);
          resetForm();
        }}
      >
        {({ values, errors, touched }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="name" className="block font-medium mb-1">
                Name:
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className={`border rounded w-full py-2 px-3 ${errors.name && touched.name ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.name && touched.name && (
                <div className="text-red-500 text-sm">{errors.name}</div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block font-medium mb-1">
                Description:
              </label>
              <Field
                type="text"
                id="description"
                name="description"
                className={`border rounded w-full py-2 px-3 ${errors.description && touched.description ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.description && touched.description && (
                <div className="text-red-500 text-sm">{errors.description}</div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block font-medium mb-1">
                Email:
              </label>
              <Field
                type="text"
                id="email"
                name="email"
                className={`border rounded w-full py-2 px-3 ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.email && touched.email && (
                <div className="text-red-500 text-sm">{errors.email}</div>
              )}
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white rounded px-4 py-2 mt-4"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? 'Creating...' : 'Create Store'}
            </button>

            {mutation.isSuccess && (
              <div className="text-green-500 mt-4">Store created successfully!</div>
            )}
            {mutation.isError && (
              <div className="text-red-500 mt-4">Failed to create store.</div>
            )}
          </Form>
        )}
      </Formik>

    </div>
  );
};

const FormCreateStoreComponent: React.FC<any> = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <FormCreateStore />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};


export default FormCreateStoreComponent;

