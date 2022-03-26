//import { object } from '@hapi/joi';

/*
En la función anterior, recorremos recursivamente la estructura de datos y
conservamos los valores solo si difieren de los  nulos . Funciona tanto
para matrices como para objetos simples.
*/
function recursivelyStripNullValues(value: unknown): unknown {
  if (value instanceof Date) {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map(recursivelyStripNullValues);
  }
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, value]) => [
        key,
        recursivelyStripNullValues(value),
      ]),
    );
  }
  if (value !== null) {
    return value;
  }
}
export default recursivelyStripNullValues;
