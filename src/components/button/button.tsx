import { TouchableOpacityProps } from 'react-native'
import { Container, Title } from './styles'

export type ButtonVariant = 'PRIMARY' | 'SECONDARY'

export interface ButtonProps extends TouchableOpacityProps {
  title: string
  variant?: ButtonVariant
}
export function Button({ title, variant = 'PRIMARY', ...rest }: ButtonProps) {
  return (
    <Container variant={variant} title={title} {...rest}>
      <Title>{title}</Title>
    </Container>
  )
}
