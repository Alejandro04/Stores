import TableComponent from '@/components/table/table';

const title = 'Store List'

enum Headers {
  Name = "name",
  Description = "description",
  Email = "email",
  Phone = "phone",
  Address = "address",
  City = "city",
  State = "state",
  Zip = "zip",
}

const config = [
  { key: 'name', label: 'Name' },
  { key: 'description', label: 'Description' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'address', label: 'Address' },
  { key: 'city', label: 'City' },
  { key: 'state', label: 'State' },
  { key: 'zip', label: 'Zip' },
];

export default function Store() {
  return (
     <TableComponent title={title} config={config} headers={Headers}  />
  );
}
