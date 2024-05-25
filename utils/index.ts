import { useValidationsBR, } from "validations-br";
import { FieldValue, Timestamp, } from "firebase/firestore";
import { ValidationsBrType, } from "./types";

export const validateFormData = (formDataValidate: Record<string, boolean>) => !Object.keys(formDataValidate).some(key => formDataValidate[key]);

export const strMin = (value: string, min: number) => value.length >= min;

// verifica se valor existe, caso sim verifica o tamanho máximo
export const strIfExistMax = (value: string, max: number) => {
  if (value.trim()) { return value.length <= max; }

  return true;
};

// eslint-disable-next-line no-useless-escape
export const isWebUrl = (value: string) => /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/.test(value);

export const useValidations = (type: ValidationsBrType, value: string) => useValidationsBR(type, value);

export const removeSpecialCharacters = (value?: string) => value?.replace(/[^\w\s]/gi, "") ?? "";

export const normalizeSpecialChars = (str: string) => str?.normalize("NFD").replace(/[\u0300-\u036F]/g, "") ?? "";

export const applyMask = (mask: string, value: string) => {
  if (/^(\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2})$/.test(value)) {
    return value;
  }

  const maskedValue = [];
  let valueIndex = 0;

  for (let i = 0; i < mask.length; i++) {
    const maskChar = mask[i];

    if (maskChar === "*") {
      maskedValue.push(valueIndex < value.length ? value[valueIndex] : "_");
      valueIndex++;
    } else {
      maskedValue.push(maskChar);
    }
  }

  return maskedValue.join("");
};

export const toDate = (value?: | null | FieldValue | Timestamp | Date) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const timestamp = value as any;

  if (timestamp?.toDate) { return timestamp?.toDate() as Date; } else if (timestamp instanceof Date) { return timestamp; }

  return undefined;
};

export const toLocaleString = (value?: | null | FieldValue | Timestamp | Date) => toDate(value)?.toLocaleString() ?? "";

/**
 * gera um id baseado em date now
 * @returns {string} Math.floor(new Date().getTime()
 */
export const uuid = () => String(Math.floor(new Date().getTime()));
