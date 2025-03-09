import React from "react";
import styled from "styled-components";
import { LinkedIn } from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 22px 0px;
  overflow-y: scroll;
`;

const Wrapper = styled.div`
  flex: 1;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 20px;
`;

const ContactCard = styled.div`
  padding: 24px;
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const ContactItem = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${({ theme }) => theme.text_primary};
  text-decoration: none;
  font-size: 18px;
  padding: 12px;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.primary + "15"};
    color: ${({ theme }) => theme.primary};
  }

  svg {
    font-size: 24px;
  }
`;

const Contact = () => {
  return (
    <Container>
      <Wrapper>
        <Title>Contact Us</Title>
        <ContactCard>
          <ContactItem 
            href="https://www.linkedin.com/in/atharva-barche-6b8585279/" 
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedIn />
            LinkedIn Profile
          </ContactItem>
          <ContactItem 
            href="mailto:barcheatharva01@gmail.com"
          >
            <EmailIcon />
            barcheatharva01@gmail.com
          </ContactItem>
        </ContactCard>
      </Wrapper>
    </Container>
  );
};

export default Contact; 