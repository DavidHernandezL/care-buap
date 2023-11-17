import ReturnHeader from '../../components/ReturnHeader/ReturnHeader';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import doctors from '../../data/doctors.json';
import { Link } from 'react-router-dom';

const MedicalProfile = () => {
  const profession = {
    psychologist: 'Psicólogo',
    psychiatrists: 'Psiquiatra',
    neurologists: 'Neurólogo',
  };
  const { id, type } = useParams();
  const professional = doctors[type].find((doctor) => doctor.id === id);
  const { name, picture } = professional;
  return (
    <>
      <ReturnHeader title='Perfil Médico' />
      <Main>
        <Card>
          <ProfilePicture src={picture || '/no-image.png'} alt='Profile picture' />
          <Name>{name}</Name>
          <Profession>{profession[type]}</Profession>
          <Address>{professional.address}</Address>
          <LinkStyled to={professional.page} target='_blank'>
            Contactar
          </LinkStyled>
        </Card>
      </Main>
    </>
  );
};

const Main = styled.main`
  display: flex;
  padding: 1rem;
  justify-content: center;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 1rem;
  border-radius: 1rem;
  background-color: rgba(181, 226, 226, 0.2);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: clamp(300px, 50%, 500px);
  height: 500px;
`;

const ProfilePicture = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
`;

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: #ffffff;
  background-color: #003b5c;
  padding: 0.5rem 2.5rem;
  border-radius: 0.5rem;
`;

const Name = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: rgba(25, 25, 25, 0.5);
`;

const Profession = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: rgba(25, 25, 25, 0.5);
`;

const Address = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: rgba(25, 25, 25, 0.5);
`;

export default MedicalProfile;
