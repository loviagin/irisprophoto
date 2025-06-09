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
              Your photo session has been successfully booked! We are looking forward to seeing you at our studio.
            </Text>

            <Text style={text}>
              Date: {date.split('at')[0]}
            </Text>
            <Text style={text}>
              Time: {date.split('at')[1]}
            </Text>

            <Text style={text}>
              Please arrive 5-10 minutes before your scheduled time. We'll be waiting for you at the studio.
            </Text>

            <Hr style={hr} />

            <Text style={footer}>
              If you have any questions or need to make changes, please contact us:
              <br />
              Email: <a href="mailto:voroninsfamily@irisprophoto.org">voroninsfamily@irisprophoto.org</a>
              <br />
              Phone: <a href="tel:+19048359485">+1 (904) 835-94-85</a>
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