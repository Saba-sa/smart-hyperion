"use server";

import ContactEmailTemplate from "@/components/ContactEmailTemplate";
import { Resend } from "resend";
import { ContactFormDataType, contactFormSchema } from "./contactForm";
import { ZodFormattedError } from "zod";

// const resend = new Resend(process.env.RESEND_API_KEY);

export type FormState = {
  success: boolean;
  message?: string;
  fields?: Record<string, string>;
  issues?: { error: string, field: string }[];
};

export async function sendEmail(prevState: FormState, formData: FormData): Promise<FormState> {
  // const dataObj = Object.fromEntries(formData);
  // const parsed = contactFormSchema.safeParse(dataObj);
  // if (!parsed.success) {
  //   const fields = Object.entries(dataObj).reduce<Record<string, string>>((acc, [key, value]) => {
  //     acc[key] = value.toString();
  //     return acc;
  //   }, {});

  //   const issues = parsed.error.issues.map((issue) => ({ error: issue.message, field: issue.path.join(".") }));

  //   return {
  //     success: false,
  //     message: "Invalid form.",
  //     fields,
  //     issues,
  //   };
  // }
  // const { name, email, business, topic, message } = parsed.data;

  // const { data, error } = await resend.emails.send({
  //   from: process.env.CONTACT_FROM ?? "",
  //   to: process.env.CONTACT_TO ?? "",
  //   replyTo: email,
  //   subject: `Contact Request: ${topic}`,
  //   react: ContactEmailTemplate({
  //     name,
  //     email,
  //     business,
  //     message,
  //     topic,
  //   }),
  // });

  // if (error) {
  //   console.error(error);
  //   return {
  //     success: false,
  //     message: "Error sending email, please try again.",
  //   };
  // } else {
  //   console.log(data);
  //   return {
  //     success: true,
  //   };
  // }


  //del this latter when gets api key
  const dataObj = Object.fromEntries(formData);
  const parsed = contactFormSchema.safeParse(dataObj);
  
  if (!parsed.success) {
    const fields = Object.entries(dataObj).reduce<Record<string, string>>((acc, [key, value]) => {
      acc[key] = value.toString();
      return acc;
    }, {});

    const issues = parsed.error.issues.map((issue) => ({
      error: issue.message,
      field: issue.path.join("."),
    }));

    return {
      success: false,
      message: "Invalid form.",
      fields,
      issues,
    };
  }

   return {
    success: true,
    message: "Email sent successfully (simulated).",
  };
}
