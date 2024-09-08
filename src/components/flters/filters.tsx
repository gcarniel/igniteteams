import { TouchableOpacityProps } from 'react-native'
import { Container, Title } from './styles'

export interface FiltersProps extends TouchableOpacityProps {
  title: string
  isActive?: boolean
}

export function Filters({ isActive = false, title, ...rest }: FiltersProps) {
  return (
    <Container isActive={isActive} {...rest}>
      <Title>{title}</Title>
    </Container>
  )
}
