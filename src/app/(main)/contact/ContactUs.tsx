"use client";
import ShiftingCountdown from "@/components/Countdown";
import { useDarkMode } from "@/components/DarkModeSwitch";
import EncryptButton from "@/components/EncryptButton";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SERVICES } from "@/data/services";
import { FormState, sendEmail } from "@/lib/actions";
import {
  ContactFormDataType,
  contactFormDefs,
  contactFormSchema,
  FormDef,
} from "@/lib/contactForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { LuLoader2, LuX } from "react-icons/lu";
import {
  startTransition,
  TransitionStartFunction,
  useActionState,
  useEffect,
  useRef,
  useTransition,
} from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Control, useForm } from "react-hook-form";

const lineVariants = {
  hidden: { y: "100%", opacity: 0 }, // Start off-screen and invisible
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 1,
      duration: 0.9,
      ease: [0.33, 1, 0.88, 1], // Custom easing for smoother motion
    },
  },
};

interface ContactInputProps {
  control: Control<ContactFormDataType>;
  name: keyof ContactFormDataType;
  placeholder: string;
  disabled: boolean;
}

const ContactTextInput = ({
  name,
  control,
  placeholder,
  disabled,
}: ContactInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              {...field}
              className="formShadow px-4 md:text-lg bg-white dark:bg-neutral-900 border border-gray-700 dark:border-neutral-200 placeholder:text-neutral-500"
              placeholder={placeholder}
              disabled={disabled}
            />
          </FormControl>
          <FormMessage className="text-red-500" />
        </FormItem>
      )}
    />
  );
};

const ContactServicesInput = ({
  control,
  name,
  placeholder,
  disabled,
}: ContactInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const { ref, ...rest } = field;
        return (
          <FormItem>
            <Select {...rest} onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger
                  disabled={disabled}
                  className="formShadow px-4 md:text-lg bg-white dark:bg-neutral-900 border border-gray-700 dark:border-neutral-200 data-[placeholder]:text-neutral-500"
                >
                  <SelectValue
                    placeholder={placeholder}
                    defaultValue={field.value}
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-white dark:bg-neutral-900 border border-gray-700">
                {SERVICES.map((s, i) => (
                  <SelectItem
                    className="cursor-pointer text-lg"
                    value={s}
                    key={i}
                  >
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage className="text-red-500" />
          </FormItem>
        );
      }}
    />
  );
};

const renderInput = (
  input: FormDef,
  control: Control<ContactFormDataType>,
  disabled: boolean
) => {
  if (input.type === "select") {
    return (
      <ContactServicesInput
        control={control}
        name={input.name as keyof ContactFormDataType}
        placeholder={input.placeholder}
        disabled={disabled}
      />
    );
  } else {
    return (
      <ContactTextInput
        control={control}
        name={input.name as keyof ContactFormDataType}
        placeholder={input.placeholder}
        disabled={disabled}
      />
    );
  }
};

interface ContactFormProps {
  dispatch: (payload: FormData) => void;
  state: FormState;
  isPending: boolean;
  startTransition: TransitionStartFunction;
}

const ContactForm = ({
  dispatch,
  state,
  isPending,
  startTransition,
}: ContactFormProps) => {
  const darkMode = useDarkMode();

  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm<ContactFormDataType>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      business: "",
      message: "",
      ...(state?.fields ?? {}),
    },
  });

  useEffect(() => {
    if (!state.success && state.issues) {
      state.issues.forEach(({ field, error }) => {
        form.setError(field as keyof ContactFormDataType, {
          type: "manual",
          message: error,
        });
      });
    }
  }, [state, form]);

  return (
    <Form {...form}>
      <form
        action={dispatch}
        className="space-y-3"
        ref={formRef}
        onSubmit={(e) => {
          form.handleSubmit(() => {
            startTransition(() => {
              dispatch(new FormData(formRef.current!));
            });
          })(e);
        }}
      >
        {contactFormDefs.map((row, ri) => (
          <div key={ri} className="flex gap-3 md:flex-row flex-col h-full">
            {row.map((input, i) => (
              <div key={i} className="md:w-1/2">
                {renderInput(input, form.control, isPending)}
              </div>
            ))}
          </div>
        ))}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  disabled={isPending}
                  className="py-3 px-4 resize-none formShadow md:text-lg w-full bg-white dark:bg-neutral-900 border focus:border-blue-500 border-gray-700 dark:border-neutral-200 placeholder:text-neutral-500"
                  placeholder="Type Your Message"
                  rows={15}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <div className="text-center">
          <EncryptButton type="submit" isLoading={isPending}>
            Submit
          </EncryptButton>
        </div>
        <style jsx>
          {`
            .formShadow {
              box-shadow: ${darkMode
                ? `rgba(0, 0, 0, 0.4) 0px 2px 4px,
              rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
              rgba(0, 0, 0, 0.2) 0px -3px 0px inset;`
                : "none;"};
            }
          `}
        </style>
      </form>
    </Form>
  );
};

const ThankYou = () => {
  return (
    <div>

    <div className="dark:text-blue-200 text-center text-3xl">
      Thank you for contacting us! We will get back to you shortly.
    </div>
    <ShiftingCountdown />
    </div>
  );
};

const ContactUs = () => {
  const [state, dispatch] = useActionState(sendEmail, {
    success: false,
  });
  const [isPending, startTransition] = useTransition();

  return (
    <div className="w-full flex pb-40 gap-3 flex-col items-center justify-center">
      <motion.div
        variants={lineVariants}
        initial="hidden"
        animate="visible"
        className="md:w-2/3 w-full px-6 md:px-0 flex flex-col gap-3"
      >
        {!state.success && state.message && !state.issues ? (
          <div className="text-red-500 flex gap-1">
            <LuX fill="red" /> {state.message}
          </div>
        ) : null}
        {/* {!state.success && state.issues ? (
          <div className="text-red-500">
            <ul>
              {state.issues.map((issue) => (
                <li key={issue} className="flex gap-1">
                  <X fill="red" />
                  {issue}
                </li>
              ))}
            </ul>
          </div>
        ) : null} */}
        {!state.success ? (
          <ContactForm
            {...{
              dispatch,
              state,
              isPending,
              startTransition,
            }}
          />
        ) : (
          <ThankYou />
        )}
      </motion.div>
    </div>
  );
};

export default ContactUs;
