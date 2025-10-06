import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Section,
  Hr,
} from '@react-email/components';
import * as React from 'react';

interface ContactEmailProps {
  name: string;
  email: string;
  message: string;
}

export const ContactEmail = ({ name, email, message }: ContactEmailProps) => (
  <Html>
    <Head />
    <Preview>Nova mensagem do seu portfólio!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>Nova Mensagem de Contato</Heading>
        <Section>
          <Text style={paragraph}>Você recebeu uma nova mensagem através do formulário do seu portfólio.</Text>
          <Hr style={hr} />
          <Text style={{ ...paragraph, ...bold }}>De:</Text>
          <Text style={paragraph}>{name}</Text>
          <Text style={{ ...paragraph, ...bold }}>Email:</Text>
          <Text style={paragraph}>{email}</Text>
          <Text style={{ ...paragraph, ...bold }}>Mensagem:</Text>
          <Text style={paragraph}>{message}</Text>
          <Hr style={hr} />
        </Section>
        <Text style={footer}>Enviado do seu Portfólio Pessoal</Text>
      </Container>
    </Body>
  </Html>
);

// Estilos para o email
const main = { backgroundColor: '#f6f9fc', fontFamily: 'Helvetica,Arial,sans-serif' };
const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  border: '1px solid #f0f0f0',
  borderRadius: '4px',
};
const heading = {
  fontSize: '24px',
  letterSpacing: '-0.5px',
  lineHeight: '1.3',
  fontWeight: '400',
  color: '#484848',
  padding: '12px 24px',
};
const paragraph = { fontSize: '16px', lineHeight: '26px', padding: '0 24px' };
const bold = { fontWeight: 'bold' as const };
const hr = { borderColor: '#e6ebf1', margin: '20px 0' };
const footer = { color: '#8898aa', fontSize: '12px', lineHeight: '16px', padding: '0 24px' };

export default ContactEmail;