import { ZodError } from 'zod';

export type ErrorItem = {
  field: string;
  message: string;
};

export const getErrosFromZod = (errors: ZodError) => {
  const errorList: ErrorItem[] = [];
  for (let i in errors.errors) {
    errorList.push({
      field: errors.errors[i].path[0].toString(),
      message: errors.errors[i].message,
    });
  }
  return errorList;
};
