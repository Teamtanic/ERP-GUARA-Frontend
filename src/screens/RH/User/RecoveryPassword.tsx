import { EnvelopeClosedIcon } from '@radix-ui/react-icons'
import { Button } from '../../../components/Button'
import { Card } from '../../../components/Card'
import { Container } from '../../../components/Container'
import { Heading } from '../../../components/Heading'
import { Logo } from '../../../components/Logo'
import { TextInput } from '../../../components/TextInput'
import ThemeToggle from '../../../components/ThemeToggle'
import { Field, Form } from 'react-final-form'
import { object, string } from 'yup'
import { requestPasswordReset } from '../../../services/User/apiService'
import { UserEmailRequest } from '../../../services/User/types'
import { useNavigate } from 'react-router'

export function RecoveryPassword() {
  const navigate = useNavigate()

  const validationSchema = object({
    email: string()
      .email('Insira um e-mail válido')
      .required('E-mail é obrigatório')
  })

  const onSubmit = async (values: UserEmailRequest) => {
    try {
      const userData: UserEmailRequest = {
        email: values.email
      }

      await requestPasswordReset(userData)

      console.log(userData)
    } catch (error) {
      console.error(error)
    }
  }

  const handleBackToLogin = () => {
    navigate('/login')
  }

  return (
    <Container hasNav={false}>
      <div className="w-full flex py-6 items-center p-24 max-md:p-6 flex-col z-50">
        <div className="w-[120px] fixed bottom-6 left-6">
          <ThemeToggle />
        </div>

        <div className="-z-50 fixed">
          <Logo className="!h-32" />
        </div>

        <div className="mt-16">
          <Heading size="lg">GuaráRP</Heading>
        </div>

        <Card className="p-6 mt-12 md:w-2/5 w-5/6 bg-gray-200">
          <div className="w-full flex justify-center">
            <Heading className="!text-gray-800">Recuperação de Senha</Heading>
          </div>
          <div className="mt-4 gap-4 flex flex-col w-full">
            <Form
              onSubmit={onSubmit}
              validate={values => {
                try {
                  validationSchema.validateSync(values, { abortEarly: false })
                } catch (err: any) {
                  return err.inner.reduce((errors: any, error: any) => {
                    return { ...errors, [error.path]: error.message }
                  }, {})
                }
              }}
              render={({ handleSubmit, submitting }) => (
                <form onSubmit={handleSubmit}>
                  <Field
                    name="email"
                    render={({ input, meta }) => (
                      <TextInput.Root
                        labelFor="email"
                        labelText="Email"
                        labelStyle="text-gray-900"
                        error={
                          meta.touched && meta.error ? meta.error : undefined
                        }
                      >
                        <TextInput.Input
                          id="email"
                          type="text"
                          placeholder="Digite o email..."
                          {...input}
                        />
                      </TextInput.Root>
                    )}
                  />

                  <Button className="bg-emerald-500 text-zinc-50 mt-5 w-full">
                    {submitting ? 'Enviando...' : 'Enviar solicitação'}
                  </Button>
                </form>
              )}
            />
            <Button
              className="bg-emerald-500 text-zinc-50"
              onClick={handleBackToLogin}
            >
              Voltar
            </Button>
          </div>
        </Card>
      </div>
    </Container>
  )
}
