import { memo } from "react";
import { ButtonProps } from "./props";
import { ButtonContainer } from "./styles";

const Button = memo<ButtonProps>(({ children, ...props }: any) => {
  return <ButtonContainer {...props}>{children}</ButtonContainer>;
});

export default Button;
