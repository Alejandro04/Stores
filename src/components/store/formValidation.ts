import * as Yup from 'yup';

export const storeSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  errorsItems: Yup.array()
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
