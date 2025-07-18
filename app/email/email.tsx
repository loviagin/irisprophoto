import * as React from 'react';
import { Html, Button, Body, Container, Head, Heading, Hr, Preview, Section, Text } from "@react-email/components";

interface EmailProps {
  type: string;
  orderId: string;
  promocode: string;
}

function Email(props: EmailProps) {
  const { type, orderId, promocode } = props;

  return (
    <Html lang="en">
      <Head />
      <Preview>Your Iris Pro Photo Gift Certificate</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logo}>
            <Heading style={h1}>Iris Pro Photo</Heading>
          </Section>
          
          <Section style={content}>
            <Heading style={h2}>Thank you for your purchase!</Heading>
            <Text style={text}>
              You have successfully purchased a gift certificate for a photo session.
            </Text>
            
            <Section style={detailsContainer}>
              <Text style={detailText}>
                <strong>Certificate type:</strong> {type}
              </Text>
              <Text style={detailText}>
                <strong>Order number:</strong> {orderId}
              </Text>
              <Text style={detailText}>
                <strong>Promocode:</strong> {promocode}
              </Text>
            </Section>

            <Text style={text}>
              To use the certificate, simply present the promo code when booking the photo session. Or simply show the code in our office during a photo shoot.
            </Text>

            <Button
              style={button}
              href="https://irisprophoto.me/book"
            >
              Book a photo session
            </Button>

            <Hr style={hr} />

            <Text style={footer}>
              If you have any questions, please contact us by email: <a href="mailto:voroninsfamilyllc@gmail.com">Voroninsfamilyllc@gmail.com</a>
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

const detailsContainer = {
  backgroundColor: '#f9f9f9',
  padding: '20px',
  borderRadius: '4px',
  margin: '20px 0',
};

const detailText = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 10px',
};

const button = {
  backgroundColor: '#333',
  borderRadius: '4px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '100%',
  margin: '20px 0',
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