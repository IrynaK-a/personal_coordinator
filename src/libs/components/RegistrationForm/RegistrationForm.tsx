import { StyledEngineProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';

import { signUpSchema } from '../../validationSchemas/signUpSchema';
import { ISignUpFormData } from '../../types/signUpFormData.interface';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as authActions from '../../slices/authSlice';

import styles from './RegistrationForm.module.scss';

export const RegistrationForm = () => {
  const dispatch = useAppDispatch();
  const { authRequestStatus } = useAppSelector(state => state.auth);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ISignUpFormData>({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = ({
    email,
    firstName,
    lastName,
    password,
  }: ISignUpFormData) => {
    dispatch(authActions.signUp({ email, firstName, lastName, password }));
  };

  return (
    <StyledEngineProvider injectFirst>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <input
          id="firstName"
          type="text"
          className={styles.input}
          placeholder="First name"
          {...register('firstName')}
        />
        <p className={styles.error}>{errors.firstName?.message}</p>

        <input
          id="lastName"
          type="text"
          className={styles.input}
          placeholder="Last name"
          {...register('lastName')}
        />
        <p className={styles.error}>{errors.lastName?.message}</p>

        <input
          id="email"
          type="email"
          className={styles.input}
          placeholder="Email"
          {...register('email')}
        />
        <p className={styles.error}>{errors.email?.message}</p>

        <input
          id="password"
          type="password"
          className={styles.input}
          placeholder="Password"
          {...register('password')}
        />
        <p className={styles.error}>{errors.password?.message}</p>

        <input
          id="confirmedPassword"
          type="password"
          className={styles.input}
          placeholder="Confirm password"
          {...register('confirmedPassword')}
        />
        <p className={styles.error}>{errors.confirmedPassword?.message}</p>

        <LoadingButton
          loading={authRequestStatus === 'pending'}
          variant="contained"
          type="submit"
          className={styles.submitButton}
        >
          <span>Sign up</span>
        </LoadingButton>
      </form>
    </StyledEngineProvider>
  );
};
