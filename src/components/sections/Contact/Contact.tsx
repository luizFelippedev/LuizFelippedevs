// src/components/sections/Contact/Contact.tsx
import { ContactForm } from './ContactForm';
import { ContactInfo } from './ContactInfo';

export function Contact() {
  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32 border-t">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <ContactInfo />
          <div className="bg-muted/50 p-6 md:p-8 rounded-lg">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}