import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';

import ButtonPrimary from '../../components/ButtonPrimary';
import ErrorMessage from '@components/ErrorMessage';
import Input from '@components/Input';
import InputPassword from '@components/InputPassword';
import MainHeader from '@components/MainHeader';
import { Container, Form, LinkStyled } from './styles';

import { zodResolver } from '@hookform/resolvers/zod';
import { registerUserSchema } from '@utils/validationSchemas';

import { useAuth } from '../../context/AuthContext';
import Loader from '../../components/Loader';
import { useState } from 'react';

const Register = () => {
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    formState: { errors },
    ...methods
  } = useForm({ resolver: zodResolver(registerUserSchema) });

  useEffect(() => {
    if (isAuthenticated) {
      setLoading(false);
      navigate('/profile');
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (registerErrors) {
      setLoading(false);
    }
  }, [registerErrors]);

  const registerUser = async (data) => {
    data.image = `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${data.fullName}`;
    setLoading(true);
    signup(data);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MainHeader title={'Registro'} subtitle={'Ingrese sus datos'} hasIcon />
          <Container>
            <FormProvider {...methods}>
              <Form onSubmit={methods.handleSubmit(registerUser)}>
                {registerErrors && <ErrorMessage>{registerErrors.msg}</ErrorMessage>}
                <Input
                  label='Nombre completo'
                  name={'fullName'}
                  {...{
                    placeholder: 'Ingrese su nombre completo',
                    type: 'text',
                    inputMode: 'text',
                  }}
                />
                {errors.fullName && (
                  <ErrorMessage>{errors.fullName.message}</ErrorMessage>
                )}
                <Input
                  label='Matrícula'
                  name={'studentId'}
                  registerOptions={{ valueAsNumber: true }}
                  {...{
                    placeholder: 'Ingrese su matricula (9 dígitos)',
                    type: 'number',
                    inputMode: 'numeric',
                  }}
                />
                {errors.studentId && (
                  <ErrorMessage>{errors.studentId.message}</ErrorMessage>
                )}
                <Input
                  label='Correo institucional'
                  name={'email'}
                  {...{
                    placeholder: 'nombre@alumno.buap.mx',
                    type: 'email',
                    inputMode: 'email',
                  }}
                />
                {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                <InputPassword
                  label='Contraseña'
                  name={'password'}
                  {...{
                    placeholder: 'Ingrese su contraseña',
                  }}
                />
                <p style={{ fontSize: '0.8rem' }}>
                  *La contraseña debe contener al menos 6 caracteres
                </p>
                {errors.password && (
                  <ErrorMessage>{errors.password.message}</ErrorMessage>
                )}
                <InputPassword
                  label='Confirmar contraseña'
                  name={'confirmPassword'}
                  {...{
                    placeholder: 'Confirme su contraseña',
                  }}
                />
                {errors.confirmPassword && (
                  <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
                )}
                <ButtonPrimary type='submit'>Registrarse</ButtonPrimary>
              </Form>
              <p>
                ¿Ya tienes cuenta? <LinkStyled to='/auth/login'>Inicia sesión</LinkStyled>
              </p>
            </FormProvider>
          </Container>
        </>
      )}
    </>
  );
};

export default Register;
