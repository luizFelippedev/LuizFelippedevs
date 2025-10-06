// src/components/common/SEO/JsonLd.tsx
import { CreativeWork, Person, WebSite } from 'schema-dts';

type Schema = Person | WebSite | CreativeWork;

interface JsonLdProps {
  schema: Schema;
}

export function JsonLd({ schema }: JsonLdProps) {
  // CORREÇÃO: Trocamos o operador de spread por Object.assign
  // para evitar o erro de tipagem do TypeScript.
  const schemaWithContext = Object.assign({}, {
    '@context': 'https://schema.org'
  }, schema);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaWithContext),
      }}
    />
  );
}