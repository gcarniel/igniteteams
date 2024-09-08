import { TouchableOpacityProps } from 'react-native'
import { Container, Icon } from './styles'
import { MaterialIcons } from '@expo/vector-icons'

export type ButtonIconVariant = 'PRIMARY' | 'SECONDARY'

export interface ButtonIconProps extends TouchableOpacityProps {
  variant?: ButtonIconVariant
  icon: keyof typeof MaterialIcons.glyphMap
}
export function ButtonIcon({
  variant = 'PRIMARY',
  icon,
  ...rest
}: ButtonIconProps) {
  return (
    <Container variant={variant} {...rest}>
      <Icon variant={variant} name={icon} />
    </Container>
  )
}
