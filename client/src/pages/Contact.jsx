import React from "react";
import styled from "styled-components";
import { LinkedIn, Email, Person } from "@mui/icons-material";

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 22px 0px;
  overflow-y: scroll;
  background: ${({ theme }) => theme.bg};
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
  padding: 0px 16px;
  font-size: 22px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
`;

const ContactSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const ContactCard = styled.div`
  flex: 1;
  min-width: 280px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: ${({ theme }) => theme.bgLight};
`;

const CardTitle = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.primary};
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const ContactItem = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${({ theme }) => theme.text_primary};
  text-decoration: none;
  font-size: 14px;
  padding: 12px;
  border-radius: 8px;
  transition: all 0.3s ease;
  border: 1px solid transparent;
  cursor: ${props => props.as === 'div' ? 'default' : 'pointer'};

  &:hover {
    background: ${({ theme, as }) => as !== 'div' ? theme.primary + 10 : 'transparent'};
    border: 1px solid ${({ theme, as }) => as !== 'div' ? theme.primary + 50 : 'transparent'};
    color: ${({ theme, as }) => as !== 'div' ? theme.primary : theme.text_primary};
  }

  svg {
    font-size: 20px;
    color: ${({ theme }) => theme.primary};
  }
`;

const InfoText = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary + 90};
  line-height: 1.5;
  margin-bottom: 8px;
`;

const Contact = () => {
  return (
    <Container>
      <Wrapper>
        <Title>Contact</Title>
        <ContactSection>
          <ContactCard>
            <CardTitle>Get in Touch</CardTitle>
            <InfoText>
              Have questions about FitTrack? Want to collaborate or report an issue? Feel free to reach out through any of these channels:
            </InfoText>
            <ContactItem 
              href="https://www.linkedin.com/in/atharva-barche-6b8585279/" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedIn />
              Connect on LinkedIn
            </ContactItem>
            <ContactItem 
              href="mailto:barcheatharva01@gmail.com"
            >
              <Email />
              barcheatharva01@gmail.com
            </ContactItem>
          </ContactCard>

          <ContactCard>
            <CardTitle>About Developer</CardTitle>
            <InfoText>
              FitTrack is developed and maintained by Atharva Barche, a passionate developer focused on creating intuitive fitness solutions that help people achieve their health goals.
            </InfoText>
            <ContactItem 
              as="div"
            >
              <Person />
              Atharva Barche
            </ContactItem>
          </ContactCard>
        </ContactSection>
      </Wrapper>
    </Container>
  );
};

export default Contact; 