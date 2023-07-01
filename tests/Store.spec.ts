import Store from '@/domain/stores/Store';

describe('Store Interface', () => {
  test('should have the correct properties', () => {
    const store: Store = {
      id: '1',
      name: 'Sample Store',
      description: 'This is a sample store',
      email: 'sample@store.com',
      phone: '123-456-7890',
      address: '123 Main St',
      city: 'Sample City',
      state: 'Sample State',
      zip: '12345',
    };

    expect(store.id).toBeDefined();
    expect(store.name).toBeDefined();
    expect(store.description).toBeDefined();
    expect(store.email).toBeDefined();
    expect(store.phone).toBeDefined();
    expect(store.address).toBeDefined();
    expect(store.city).toBeDefined();
    expect(store.state).toBeDefined();
    expect(store.zip).toBeDefined();
  });
});
