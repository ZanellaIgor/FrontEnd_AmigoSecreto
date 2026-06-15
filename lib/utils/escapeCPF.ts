export const escapeCPF = (cpf: string): string => {
  return cpf.replace(/\.|-/gm, '');
};
