import { SERVICES } from "@/data/services";
import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1, {
    message: "Please enter your name",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  business: z.string().min(1, {
    message: "Please enter your business name",
  }),
  topic: z.enum(SERVICES, {
    message: "Please select a topic",
  }),
  message: z.string()
});

export type ContactFormDataType = z.infer<typeof contactFormSchema>;

export interface FormDef {
  name: string;
  type: string;
  placeholder: string;
}

export const contactFormDefs: FormDef[][] = [
  [
    {
      name: "name",
      type: "text",
      placeholder: "Name",
    },
    {
      name: "email",
      type: "text",
      placeholder: "Email",
    },
  ],
  [
    {
      name: "business",
      type: "text",
      placeholder: "Business Name",
    },
    {
      name: "topic",
      type: "select",
      placeholder: "Select a service",
    },
  ],
];
