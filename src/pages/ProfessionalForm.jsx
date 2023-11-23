import ReturnHeader from '../components/ReturnHeader/ReturnHeader';
import styled from 'styled-components';
import { useForm, FormProvider } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { editSchema } from '../utils/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '../components/Input';
import PwdInput from '../components/InputImage';
import { useEffect } from 'react';
import ErrorMessage from '../components/ErrorMessage';
import ButtonPrimary from '../components/ButtonPrimary';
import {
  createProfessionalRequest,
  getProfessionalRequest,
  updateProfessionalRequest,
} from '../services/professional';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const ProfesionalForm = () => {
  const { id } = useParams();
  const [professional, setProfessional] = useState({});
  const {
    formState: { errors },
    setValue,
    ...methods
  } = useForm();

  useEffect(() => {
    const getProfesional = async () => {
      const { data } = await getProfessionalRequest(id);
      setValue('fullName', data.data.fullName);
      setValue('address', data.data.address);
      setValue('page', data.data.page);
      setValue('image', data.data.image);
      setValue('type', data.data.type);
      setProfessional(data.data);
    };
    if (id !== 'add') getProfesional();
  }, []);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      if (id !== 'add') {
        await updateProfessionalRequest(id, data);
      } else {
        await createProfessionalRequest(data);
      }
      navigate('/dashboard');
    } catch (error) {
      
    }
  };

  return (
    <>
      <ReturnHeader title='Editar Especialista' />
      <Container>
        <FormProvider {...methods}>
          <form style={{ width: '100%' }} onSubmit={methods.handleSubmit(onSubmit)}>
            <InputSection>
              <Input
                label='Nombre completo'
                name={'fullName'}
                {...{
                  placeholder: 'Cambiar nombre completo',
                  type: 'text',
                  inputMode: 'text',
                }}
              />
              {errors.fullName && <ErrorMessage>{errors.fullName.message}</ErrorMessage>}
              <Input
                label='Dirección'
                name={'address'}
                {...{
                  placeholder: 'Cambiar dirección',
                  type: 'text',
                  inputMode: 'text',
                }}
              />
              <RadioField>
                <input
                  {...methods.register('type')}
                  name='type'
                  type='radio'
                  value={'psychologist'}
                />
                <label htmlFor=''>Psicólogo</label>
              </RadioField>
              <RadioField>
                <input
                  {...methods.register('type')}
                  name='type'
                  type='radio'
                  value={'psychiatrists'}
                />
                <label htmlFor=''>Psiquiatra</label>
              </RadioField>
              <RadioField>
                <input
                  {...methods.register('type')}
                  name='type'
                  type='radio'
                  value={'neurologists'}
                />
                <label htmlFor=''>Neurólogo</label>
              </RadioField>
              <Input
                label='Pagina web'
                name={'page'}
                {...{
                  placeholder: 'Cambiar url de pagina web',
                  type: 'text',
                  inputMode: 'text',
                }}
              />
              <Input
                label='Imagen de perfil'
                name={'image'}
                {...{
                  placeholder: 'Link de imagen de perfil',
                  type: 'text',
                  inputMode: 'text',
                }}
              />

              <ButtonPrimary type='submit'>
                {id !== 'add' ? 'Editar especialista' : 'Agregar especialista'}
              </ButtonPrimary>
            </InputSection>
          </form>
        </FormProvider>
      </Container>
    </>
  );
};

export default ProfesionalForm;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  align-items: center;
  height: calc(100vh - 300px);
`;

const InputSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  gap: 16px;
`;

const Label = styled.label`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const RadioField = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
`;
