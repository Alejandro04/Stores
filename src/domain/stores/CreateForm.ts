export type Item = {
  name?: string;
  description?: string;
  price?: string;
  quantity?: string;
}

export type CreateFormValues = {
  name: string;
  description: string;
  email: string;
  items: Item[];
};