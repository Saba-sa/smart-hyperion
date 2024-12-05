interface TemplateProps {
  name: string;
   email: string;
  role: string;
  message: string;
}

export default function ContactEmailTemplate({ name, email,role, message }: TemplateProps) {

  return (
    <div className="flex flex-col min-h-[50vh] justify-center py-20 px-60 gap-10">
      <div>
        <h3>Sender: {name} {`<${email}>`}</h3>
      </div>
      <div>
        <h3>Role: {role}</h3>
      </div>
      <div>
         <h3>Message:</h3>
        <p>{message}</p>
      </div>
    </div>
  )
}