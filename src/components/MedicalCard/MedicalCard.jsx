import styled from 'styled-components';

const MedicalCard = ({ professional }) => {
  return (
    <Card>
      <img src={professional.image || '/no-image.png'} alt='Foto de perfil' />
      <h2>{professional.fullName}</h2>
    </Card>
  );
};

const Card = styled.div`
  display: flex;
  width: clamp(280px, 100%, 400px);
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 1rem;
  background-color: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
  }
  h2 {
    font-size: 1.4rem;
    font-weight: 600;
    color: rgba(25, 25, 25, 0.5);
  }

  @media screen and (max-width: 768px) {
    h2 {
      font-size: 1rem;
    }

    img {
      width: 50px;
      height: 50px;
    }
  }
`;

export default MedicalCard;
