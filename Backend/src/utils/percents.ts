const percentC = (students: number, places: number) => (students / places).toFixed(2);

const classStatus = (percent: string) => {
  if (percent === "0.00") return "Vazia";
  if (percent === "1.00") return "Ocupada";
  return "Há vagas";
};

export default { percentC, classStatus };
