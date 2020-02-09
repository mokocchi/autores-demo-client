export const API_BASE_URL = 'https://autores-demo-mock-api.herokuapp.com/api/v1.0';

export const TOKEN_AUTH_URL = "http://localhost:8080/oauth/v2/token";

export const TIPO_SELECCION = "5";
export const TIPO_MULTIPLE_CHOICE = "6";
export const TIPO_CONTADORES = "7";
export const TIPO_RECOLECCION = "8";

export const TIPOS_EXTRA = [TIPO_SELECCION, TIPO_MULTIPLE_CHOICE, TIPO_CONTADORES, TIPO_RECOLECCION];
export const TIPOS_OPCIONES = [TIPO_SELECCION, TIPO_MULTIPLE_CHOICE, TIPO_RECOLECCION];

export const TIPO_DEPOSITO = "9";

export const CONDITIONS_ARRAY = [{ name: "SÍ se elige", code: "YES" },
{ name: "NO se elige", code: "NO" },
{ name: "SÍ se pasó por", code: "YES_START" },
{ name: "NO se pasó por", code: "NO_START" }]

export const TASK_CONDITIONS_ARRAY = [{ name: "SÍ se pasó por", code: "YES_START" },
{ name: "NO se pasó por", code: "NO_START" }]