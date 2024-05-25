export enum Message {
	INVALID_USER = "Invalid user.",
	PERMISSION_DENIED = "Permission denied.",
	UNAUTHORIZED_401 = "Unauthorized.",
  FORBIDDEN_403 = "Forbidden.",
	NOT_FOUND = "Not found.",
	PERMISSION_NOT_FOUND = "Permission not found.",
	USER_NOT_FOUND = "User not found.",
	TOKEN_SECRET_NOT_FOUND = "Token secret not found.",
	TOKEN_SECRET_RECOVERY_NOT_FOUND = "Token secret not found.",
	INTERNAL_SERVER_ERROR = "Internal server error.",
	INVALID_TOKEN = "Invalid token.",
	TOKEN_NOT_FOUND = "Token not found.",
	TOKEN_EXPIRED = "Token expired.",
	TOKEN_ERROR = "Token error.",
	PERMISSION_IS_EMPTY = "Permission is empty.",
	TEMPLATE_NOT_FOUND = "Template not found.",
	TEMPLATE_GROUP_NOT_FOUND = "Template group not found.",
	PROCESS_NOT_FOUND = "Process not found.",
	PROCESS_GROUP_NOT_FOUND = "Process group not found.",
	PROCESS_HISTORY_NOT_FOUND = "Process history not found.",
	USER_GROUP_NOT_FOUND = "User group not found.",
	USER_GROUP_FORBIDDEN = "User group forbidden.",
	SIZE_FILE_EXCEEDED = "Size file exceeded.",
	FILE_NOT_FOUND = "File not found.",
	FILE_TYPE_NOT_ALLOWED = "File type not allowed.",
	CONFLICT_MAXIMUM_FILE="Amount of file per process is ",
	FILE_STREAM_ERROR="Stream file error.",
	EMAIL_URL_WEB_RECOVERY_NOT_FOUND="Configuration EMAIL_URL_WEB_RECOVERY is not valid. Please, check the configuration file.",
}

export type ValidationsBrType = "cnpj" | "cpf" | "cep" | "email" | "pis" | "phone" | "uf" | "cnh";
