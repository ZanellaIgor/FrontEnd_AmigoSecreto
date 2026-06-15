import { ZodError } from 'zod';

export type ErrorItem = {
  field: string;
  message: string;
};

export const getErrorsFromZod = (errors: ZodError) => {
  const errorList: ErrorItem[] = [];
  for (const issue of errors.issues) {
    errorList.push({
      field: issue.path[0].toString(),
      message: issue.message,
    });
  }
  return errorList;
};
