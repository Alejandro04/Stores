import { CreateFormValues } from '@/domain/stores/CreateForm';
import { useMutation } from '@tanstack/react-query';

export const useCreateStore = <T extends keyof CreateFormValues>(fields: T[], endpoint: string) => {
  const mutation = useMutation((data: CreateFormValues) => {
    const payload: Partial<CreateFormValues> = {};

    fields.forEach((field) => {
      payload[field] = data[field];
    });

    return fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(res => res.json());
  });

  return mutation;
};
