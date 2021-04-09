import { GATEWAY_HOST } from "./env";


export const API_BASE_URL = `${GATEWAY_HOST}/api/v1.0`;

export const PLANOS_URL = `${GATEWAY_HOST}/uploads/planos`;

export const TOKEN_AUTH_URL = `${GATEWAY_HOST}/api/v1.0/tokens`;

export const TIPO_SIMPLE = "simple";
export const TIPO_TEXT_INPUT = "textInput";
export const TIPO_NUMBER_INPUT = "numberInput";
export const TIPO_CAMERA_INPUT = "cameraInput";
export const TIPO_SELECT = "select";
export const TIPO_MULTIPLE = "multiple";
export const TIPO_COUNTERS = "counters";
export const TIPO_COLLECT = "collect";
export const TIPO_DEPOSIT = "deposit";
export const TIPO_GPS_INPUT = "GPSInput";
export const TIPO_AUDIO_INPUT = "audioInput";

export const TIPO_SELECCION = "5";
export const TIPO_MULTIPLE_CHOICE = "6";
export const TIPO_CONTADORES = "7";
export const TIPO_RECOLECCION = "8";

export const TIPOS_EXTRA = [TIPO_SELECCION, TIPO_MULTIPLE_CHOICE, TIPO_CONTADORES, TIPO_RECOLECCION];
export const TIPOS_OPCIONES = [TIPO_SELECCION, TIPO_MULTIPLE_CHOICE, TIPO_RECOLECCION];

export const TIPO_DEPOSITO = "9";

export const TIPOS_PLANO = [TIPO_RECOLECCION, TIPO_DEPOSITO]

export const PUBLIC_ID = "1";
export const PRIVATE_ID = "2";

export const CONDITIONS_ARRAY = [{ name: "SÍ se elige", code: "YES" },
{ name: "NO se elige", code: "NO" },
{ name: "Se contestó bien", code: "CORRECT"},
{ name: "No se contestó bien", code: "INCORRECT"},
{ name: "SÍ se pasó por", code: "YES_TASK" },
{ name: "NO se pasó por", code: "NO_TASK" }]

export const TASK_CONDITIONS_ARRAY = [{ name: "SÍ se pasó por", code: "YES_TASK" },
{ name: "NO se pasó por", code: "NO_TASK" }]