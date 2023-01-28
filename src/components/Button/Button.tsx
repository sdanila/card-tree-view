import React from 'react'
import { Button as ButtonBootstrap, ButtonProps } from 'react-bootstrap';
import block from 'bem-cn';

interface IButtonProps extends ButtonProps {
  text: string
  color?: string
}

const b = block('button');

function Button({ text, variant, type, size, color, ...props }: IButtonProps) {
  return (
    <div className={b('wrapper', { colors: color })}>
      <ButtonBootstrap
        type={type}
        size={size}
        variant={variant}
        {...props}
      >
        {text}
      </ButtonBootstrap>
    </div>
  );
}

export default Button;