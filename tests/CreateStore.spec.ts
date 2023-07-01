import { CreateFormValues, Item } from '@/domain/stores/CreateForm';

describe('CreateFormValues Interface', () => {
  test('should have the correct properties', () => {
    const item: Item = {
      name: 'Sample Item',
      description: 'This is a sample item',
      price: '10.99',
      quantity: '2',
    };

    const formValues: CreateFormValues = {
      name: 'Sample Form',
      description: 'This is a sample form',
      email: 'sample@example.com',
      items: [item],
    };

    expect(formValues.name).toBeDefined();
    expect(formValues.description).toBeDefined();
    expect(formValues.email).toBeDefined();
    expect(formValues.items).toBeDefined();
    expect(formValues.items.length).toBe(1);
    expect(formValues.items[0]).toEqual(item);
  });
});
