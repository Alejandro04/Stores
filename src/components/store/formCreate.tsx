import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Link from 'next/link';
import { CreateFormValues } from '@/domain/stores/CreateForm';
import { useCreateStore } from '@/hooks/use-cases/usePostStore';
import { storeSchema } from './formValidation';

const queryClient = new QueryClient()

// Form config
const fields: (keyof CreateFormValues)[] = ['name', 'description', 'email', 'items'];
const endpoint = '/api/stores';

const FormCreateStore: React.FC = () => {
  const mutation = useCreateStore(fields, endpoint);

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
      <Formik<CreateFormValues>
        initialValues={{
          name: '',
          description: '',
          email: '',
          items: [],
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

            {/*TODO: errors msg type*/}
            <FieldArray name="items">
              {({ form, push, remove }) => (
                <>
                  <div style={{ display: 'flex' }}>
                    <h2 className="text-lg font-semibold mb-2 mr-2 mt-1">Items</h2>
                    <button type="button" onClick={() => push({ name: '', description: '', price: '', quantity: '' })} className="text-sm text-blue-500">
                      Add Items
                    </button>
                  </div>
                  <div>
                    {form.values.items.length === 0 && errors.items && (
                      <div className="text-red-500 text-sm">{errors.items}</div>
                    )}
                  </div>
                  {values.items.map((item, index) => (
                    <div key={index} className="mb-4">
                      <h3 className="text-sm font-medium mb-1">Item {index + 1}</h3>
                      <div className="flex">
                        <div className="mr-4">
                          <label htmlFor={`items[${index}].name`} className="block mb-1">
                            Name:
                          </label>
                          <Field
                            type="text"
                            id={`items[${index}].name`}
                            name={`items[${index}].name`}
                            className={`border rounded w-full py-2 px-3 ${errors.items?.[index]?.name && touched.items?.[index]?.name ? 'border-red-500' : 'border-gray-300'}`}
                          />
                          {errors.items?.[index]?.name && touched.items?.[index]?.name && (
                            <div className="text-red-500 text-sm">{errors.items[index].name}</div>
                          )}
                        </div>
                        <div className="mr-4">
                          <label htmlFor={`items[${index}].description`} className="block mb-1">
                            Description:
                          </label>
                          <Field
                            type="text"
                            id={`items[${index}].description`}
                            name={`items[${index}].description`}
                            className={`border rounded w-full py-2 px-3 ${errors.items?.[index]?.description && touched.items?.[index]?.description ? 'border-red-500' : 'border-gray-300'}`}
                          />
                          {errors.items?.[index]?.description && touched.items?.[index]?.description && (
                            <div className="text-red-500 text-sm">{errors.items[index].description}</div>
                          )}
                        </div>

                        <div className="mr-4">
                          <label htmlFor={`items[${index}].price`} className="block mb-1">
                            Price USD:
                          </label>
                          <Field
                            type="number"
                            id={`items[${index}].price`}
                            name={`items[${index}].price`}
                            className={`border rounded w-full py-2 px-3 ${errors.items?.[index]?.price && touched.items?.[index]?.price ? 'border-red-500' : 'border-gray-300'}`}
                          />
                          {errors.items?.[index]?.price && touched.items?.[index]?.price && (
                            <div className="text-red-500 text-sm">{errors.items[index].price}</div>
                          )}
                        </div>

                        <div className="mr-4">
                          <label htmlFor={`items[${index}].quantity`} className="block mb-1">
                            Quantity:
                          </label>
                          <Field
                            type="number"
                            id={`items[${index}].quantity`}
                            name={`items[${index}].quantity`}
                            className={`border rounded w-full py-2 px-3 ${errors.items?.[index]?.quantity && touched.items?.[index]?.quantity ? 'border-red-500' : 'border-gray-300'}`}
                          />
                          {errors.items?.[index]?.quantity && touched.items?.[index]?.quantity && (
                            <div className="text-red-500 text-sm">{errors.items[index].quantity}</div>
                          )}
                        </div>


                      </div>
                      <button type="button" onClick={() => remove(index)} className="text-sm text-red-500 mt-1">
                        Remove Item
                      </button>
                    </div>
                  ))}
                </>
              )}
            </FieldArray>

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

