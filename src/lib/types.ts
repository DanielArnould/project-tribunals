import { Highlight } from "react-pdf-highlighter-extended";

export type InputFieldValue = string | number;
export type InputFieldValidation = "auto" | "human" | "double";
export type TaskStatus = "complete" | "incomplete";

interface BaseInputField {
  name: string;
  isRequired: boolean;
  hint?: string;

  // TODO: Complete validation and autoinput
  searchKey?: unknown;
  validationKey?: unknown;
}

export interface DropdownInputField extends BaseInputField {
  container: "dropdown";
  options: string[];
}

export interface ShorttextInputField extends BaseInputField {
  container: "shorttext";
}

export interface LongtextInputField extends BaseInputField {
  container: "longtext";
}

export interface NumberInputField extends BaseInputField {
  container: "number";
  min: number;
  max: number;
}

export type InputField =
  | DropdownInputField
  | ShorttextInputField
  | LongtextInputField
  | NumberInputField;

export interface Task {
  name: string;
  description: string;
  fieldTypes: { [fieldTypeId: string]: InputField };
}


export interface LabelledDocument {
  name: string;
  caseId: string;
  /** url of the pdf document associated. TODO: Change this */
  url: string;
  creationDate: Date;
  lastEdited: Date;
  tasks: {
    [taskId: string]: {
      status: TaskStatus;
      inputFields: {
        [fieldTypeId: string]: Array<{
          fieldId: string;
          value: InputFieldValue;
        }>;
      };
      highlights: Array<Highlight>
    };
  };
}
