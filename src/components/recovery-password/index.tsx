import { Field, Form, Formik, FormikProps, ErrorMessage, FormikErrors } from 'formik';
import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { Auth } from 'aws-amplify';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { cx } from 'cva';
import { CustomFormikInputGroupText } from '@/components/forms/custom-formik-input-group-text';

interface FormValues {
  email: string;
  verificationCode: string;
  password: string;
  passwordConfirmation: string;
  errorService: string;
}

export default function RecoveryPasswordForm() {
  const { push, query } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={'px-2'}>
      <div
        className={
          'border shadow-[0px_5px_16px_rgba(8,15,52,0.06)] w-full max-w-[528px] py-10 rounded-[34px] border-solid border-[#eff0f7] bg-white px-4 md:px-12 pt-28'
        }
      >
        <h2 className={cx('text-center font-semibold text-2xl md:text-[34px] leading-[46px] text-[#556ee6]')}>
          Cambiar tu contraseña
        </h2>
        <p
          className={
            'not-italic font-normal text-base md:text-lg leading-[30px] text-[#4f4f4f] mb-[10px] text-center'
          }
        >
          Ingresa el código de verificación que te enviamos a tu correo electrónico y tu nueva contraseña.
        </p>
        <p className="mt-1 text-sm text-gray-400  mb-[10px]">Nota: Es posible que tu correo haya llegado a la bandeja de spam, no olvides revisar esta carpeta.</p>

        <Formik
          initialValues={{
            email: '',
            verificationCode: '',
            password: '',
            passwordConfirmation: '',
            errorService: ''
          }}
          validate={(values) => {
            const errors: FormikErrors<FormValues> = {};
            if (values.password !== values.passwordConfirmation) {
              errors.passwordConfirmation = 'Las contraseñas no coinciden';
            }
            if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(values.password)) {
              errors.password = 'La contraseña no cumple con los requisitos';
            }
            return errors;
          }}
          onSubmit={async (values, actions) => {
            setIsLoading(true);
            try {
              await Auth.forgotPasswordSubmit(values.email.trim().toLowerCase(), values.verificationCode, values.password);
              toast.info('Se ha creado la nueva contraseña correctamente');
              
              await Auth.signIn({
                username: values.email.trim().toLowerCase(),
                password: values.password,
              });
              push({
                pathname: '/store',
                query: {
                  ...query,
                },
              });
            } catch (error:any) {
              const { message } = error;
              actions.setErrors({
                errorService: message,
              });
              setIsLoading(false);
              toast.error('Ha ocurrido un error al intentar crear la nueva contraseña');
            }
          }}
        >
          {(props: FormikProps<FormValues>) => (
            <Form>
              <div>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Correo electrónico"
                  required
                  label="Correo electrónico *"
                  component={CustomFormikInputGroupText}
                  className={'h-16 border text-sm rounded-2xl border-solid p-2.5 border-[#e0e0e0] w-full mt-2'}
                  labelClassName={'font-normal text-[15px] leading-6 text-[#333333]'}
                />
              </div>
              <div className='mt-2'>
                <Field
                  type="text"
                  name="verificationCode"
                  id="verificationCode"
                  placeholder="Código de verificación"
                  required
                  label="Código de verificación *"
                  component={CustomFormikInputGroupText}
                  className={'h-16 border text-sm rounded-2xl border-solid p-2.5 border-[#e0e0e0] w-full mt-2'}
                  labelClassName={'font-normal text-[15px] leading-6 text-[#333333]'}
                />
              </div>
              <div className='mt-2'>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  placeholder="Nueva contraseña"
                  required
                  label="Nueva contraseña *"
                  component={CustomFormikInputGroupText}
                  className={'h-16 border text-sm rounded-2xl border-solid p-2.5 border-[#e0e0e0] w-full mt-2'}
                  labelClassName={'font-normal text-[15px] leading-6 text-[#333333]'}
                />
                <p className={'mt-1 text-sm text-gray-400'}>
                  La contraseña debe tener al menos 8 caracteres y contener al menos una letra mayúscula, una
                  letra minúscula, un número y un carácter especial
                </p>
                <ErrorMessage name="passwordPattern" component="div" className="text-red-500" />
              </div>
              <div className='mt-2'>
                <Field
                  type="password"
                  name="passwordConfirmation"
                  id="passwordConfirmation"
                  placeholder="Confirma nueva contraseña"
                  required
                  label="Confirma nueva contraseña *"
                  component={CustomFormikInputGroupText}
                  className={'h-16 border text-sm rounded-2xl border-solid p-2.5 border-[#e0e0e0] w-full mt-2'}
                  labelClassName={'font-normal text-[15px] leading-6 text-[#333333]'}
                />
                <ErrorMessage name="passwordConfirmationMsg" component="div" className="text-red-500" />
              </div>

              <div className='mt-2'>
                <ErrorMessage name="errorService" component="div" className="text-red-500" />
              </div>

              <div>
                <Button
                  type="submit"
                  className={
                    'h-14 w-full rounded-2xl text-white font-semibold text-lg leading-[30px] text-center  bg-[#4850F3] mt-12 focus:outline-none focus:ring-4 focus:ring-blue-300 hover:opacity-[0.90] disabled:opacity-50 disabled:cursor-not-allowed'
                  }
                  color="primary"
                  block
                  disabled={!props.dirty || isLoading}
                >
                  Nueva contraseña
                </Button>
              </div>
            </Form>
          )}
        </Formik>
        <div className="mt-3 text-center text-[#4850F3]">
          <Link
            href={{
              pathname: '/',
              query: {
                ...query,
              },
            }}
          >
            Regresar a la vista de Iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
