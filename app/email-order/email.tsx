import * as React from 'react';
import { Html, Body, Container, Head, Heading, Hr, Preview, Section, Text } from "@react-email/components";

interface EmailProps {
  name: string;
  date: string;
}

function Email(props: EmailProps) {
  const { name, date } = props;

  
  return (
    <Html lang="en">
      <Head />
      <Preview>Your Photo Session is Confirmed!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logo}>
            <Heading style={h1}>Iris Pro Photo</Heading>
          </Section>

          <Section style={content}>
            <Heading style={h2}>Dear {name},</Heading>
            <Text style={text}>
              Your photo session has been successfully booked! We are excited to create beautiful memories with you.
            </Text>

            <Text style={text}>
              Date: {date.split('at')[0]}
            </Text>
            <Text style={text}>
              Time: {date.split('at')[1]}
            </Text>

            <Text style={text}>
              We will contact you as soon as possible to arrange a time that is convenient for you.
            </Text>

            <Hr style={hr} />

            <Text style={footer}>
              If you need to reschedule or have any questions, please contact us by email: <a href="mailto:voroninsfamily@irisprophoto.org">voroninsfamily@irisprophoto.org</a>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '580px',
};

const logo = {
  textAlign: 'center' as const,
  marginBottom: '30px',
};

const h1 = {
  color: '#333',
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '0',
};

const h2 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0 0 20px',
};

const content = {
  backgroundColor: '#ffffff',
  padding: '40px',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 20px',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const footer = {
  color: '#666',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '0',
};

export default Email;