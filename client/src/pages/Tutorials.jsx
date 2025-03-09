import React from "react";
import styled from "styled-components";
import { PlayCircle, FitnessCenter, Timer, Restaurant } from "@mui/icons-material";

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

const TutorialSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const TutorialCard = styled.div`
  flex: 1;
  min-width: 280px;
  max-width: 320px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: ${({ theme }) => theme.bgLight};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 1px 8px 25px 0px ${({ theme }) => theme.primary + 25};
  }
`;

const CardTitle = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.primary};
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const TutorialLink = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Description = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary + 90};
  line-height: 1.5;
`;

const IconContainer = styled.div`
  color: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  
  svg {
    font-size: 20px;
  }
`;

const Tag = styled.div`
  padding: 4px 12px;
  border-radius: 8px;
  background: ${({ theme }) => theme.primary + 15};
  color: ${({ theme }) => theme.primary};
  font-size: 12px;
  font-weight: 500;
  width: fit-content;
`;

const tutorials = [
  {
    title: "Beginner's Guide to Weight Training",
    description: "Learn proper form and techniques for basic weight training exercises. Perfect for those just starting their fitness journey.",
    duration: "15 mins",
    category: "Strength Training",
    icon: <FitnessCenter />,
    link: "https://www.youtube.com/watch?v=D7KaRcUTQeE"
  },
  {
    title: "HIIT Workout for Fat Loss",
    description: "High-Intensity Interval Training workout designed to maximize calorie burn and improve cardiovascular fitness.",
    duration: "12 mins",
    category: "Cardio",
    icon: <Timer />,
    link: "https://www.youtube.com/watch?v=ml6cT4AZdqI"
  },
  {
    title: "Nutrition Basics for Muscle Gain",
    description: "Understanding macronutrients, meal timing, and proper nutrition for building muscle effectively.",
    duration: "10 mins",
    category: "Nutrition",
    icon: <Restaurant />,
    link: "https://www.youtube.com/watch?v=7s4O7aCKZR4"
  },
  {
    title: "Full Body Workout Routine",
    description: "Complete full body workout routine targeting all major muscle groups for overall strength and fitness.",
    duration: "20 mins",
    category: "Strength Training",
    icon: <FitnessCenter />,
    link: "https://www.youtube.com/watch?v=UBMk30rjy0o"
  },
  {
    title: "Meal Prep for Fitness Goals",
    description: "Learn how to prepare healthy meals in advance to support your fitness goals and maintain a balanced diet.",
    duration: "15 mins",
    category: "Nutrition",
    icon: <Restaurant />,
    link: "https://www.youtube.com/watch?v=7kGnq9AC5Qg"
  },
  {
    title: "Home Cardio Workout",
    description: "Effective cardio exercises you can do at home without any equipment to improve endurance and burn calories.",
    duration: "18 mins",
    category: "Cardio",
    icon: <Timer />,
    link: "https://www.youtube.com/watch?v=gC_L9qAHVJ8"
  }
];

const Tutorials = () => {
  return (
    <Container>
      <Wrapper>
        <Title>Tutorials</Title>
        <TutorialSection>
          {tutorials.map((tutorial, index) => (
            <TutorialLink 
              href={tutorial.link} 
              target="_blank" 
              rel="noopener noreferrer"
              key={index}
            >
              <TutorialCard>
                <Tag>{tutorial.category}</Tag>
                <CardTitle>{tutorial.title}</CardTitle>
                <Description>{tutorial.description}</Description>
                <IconContainer>
                  {tutorial.icon}
                  {tutorial.duration}
                  <PlayCircle style={{ marginLeft: 'auto' }}/>
                </IconContainer>
              </TutorialCard>
            </TutorialLink>
          ))}
        </TutorialSection>
      </Wrapper>
    </Container>
  );
};

export default Tutorials; 