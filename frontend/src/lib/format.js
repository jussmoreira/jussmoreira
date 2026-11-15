/** Número con dos cifras: 1 → "01". Índices de sección, pasos, columnas. */
export const pad2 = (n) => String(n).padStart(2, "0");

/** Código de ficha de un proyecto a partir de su posición: 0 → "REF-01". */
export const refCode = (index) => `REF-${pad2(index + 1)}`;
