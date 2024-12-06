"use server";
import {joinusFormSchema } from "./contactForm";
 import JoinusEmailTemplate from "@/components/JoinusEmailTemplate";
import { Resend } from "resend";
 
// const resend = new Resend(process.env.RESEND_API_KEY);

export type FormState = {
  success: boolean;
  message?: string;
  fields?: Record<string, string>;
  issues?: { error: string; field: string }[];
};

export async function sendJoinUsEmail(
  prevState: FormState,
  formData: FormData
  ): Promise<FormState> {
  //   const dataObj = Object.fromEntries(formData);
  //  const parsed = joinusFormSchema.safeParse(dataObj);
  // const temprole = formData.get("role");  
  //  if (!parsed.success) {
  //   const fields = Object.entries(dataObj).reduce<Record<string, string>>(
  //     (acc, [key, value]) => {
  //       acc[key] = value.toString();
  //       return acc;
  //     },
  //     {}
  //   );

  //   const issues = parsed.error.issues.map((issue:any) => ({
  //     error: issue.message,
  //     field: issue.path.join("."),
  //   }));

  //   return {
  //     success: false,
  //     message: "Invalid form data.",
  //     fields,
  //     issues,
  //   };
  // }

  // const { name, email, role } = parsed.data;

  // const { data, error } = await resend.emails.send({
  //   from: process.env.CONTACT_FROM ?? "",
  //   to: process.env.CONTACT_TO ?? "",
  //   replyTo: email,
  //   subject: `Join Us Request: ${role}`,
  //   react: JoinusEmailTemplate({
  //     name,
  //     email,
  //     role,
  //     message: `Role Interested In: ${role}`,  
  //    }),
  // });

//    if (error) {
//     console.error(error);
//     return {
//       success: false,
//       message: "Error sending email, please try again.",
//     };
//   } else {
//     console.log(data);
//     return {
//       success: true,
//     };
//  }
 

 //del this latter when gets api key
 const dataObject = Object.fromEntries(formData);
 const parsedVal = joinusFormSchema.safeParse(dataObject);
 
 if (!parsedVal.success) {
   const fields = Object.entries(dataObject).reduce<Record<string, string>>((acc, [key, value]) => {
     acc[key] = value.toString();
     return acc;
   }, {});

   const issues = parsedVal.error.issues.map((issue) => ({
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