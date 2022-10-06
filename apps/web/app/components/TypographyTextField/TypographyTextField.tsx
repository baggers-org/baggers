import React, { useEffect, useRef, useState } from 'react';
import {
  TextField,
  TextFieldProps,
  TypographyProps,
  useTheme,
} from '@mui/material';
import { Typography } from '@mui/material/styles/createTypography';

export type TypographyTextFieldProps = {
  variant?: Omit<TypographyProps['variant'], 'inherit'>;
} & Omit<TextFieldProps, 'variant'>;

let canvas: HTMLCanvasElement;
export const TypographyTextField: React.FC<TypographyTextFieldProps> = ({
  variant = `h4`,
  ...textFieldProps
}) => {
  const theme = useTheme();
  const styles = theme.typography[variant as keyof Typography] as Record<
    string,
    unknown
  >;

  const [width, setWidth] = useState<string | number>(`100%`);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>();

  function getTextWidth(el: HTMLInputElement | HTMLTextAreaElement) {
    // uses a cached canvas if available
    if (!canvas) {
      canvas = document.createElement(`canvas`);
    }
    const context = canvas.getContext(`2d`);
    if (!context) return 0;
    // get the full font style property
    const font = window.getComputedStyle(el, null).getPropertyValue(`font`);

    const text = el.value || el.placeholder;
    // set the font attr for the canvas text
    context.font = font;
    const textMeasurement = context.measureText(text);
    console.log(textMeasurement);

    return textMeasurement.width;
  }

  const resizeInput = () => {
    if (!inputRef.current) return;
    setWidth(getTextWidth(inputRef.current) + 16);
  };

  useEffect(() => {
    if (width === `100%`) {
      resizeInput();
    }
  }, [inputRef.current]);

  const onChange: TextFieldProps['onChange'] = (e) => {
    resizeInput();
    textFieldProps?.onChange?.(e);
  };

  return (
    <TextField
      maxRows={4}
      multiline
      {...textFieldProps}
      inputRef={inputRef}
      onChange={onChange}
      sx={{
        p: 0,
        m: 0,
        width,
        maxWidth: `100%`,
        div: {
          ...styles,
          maxWidth: `100%`,
          width,
          p: 0,
          m: 0,
        },
        input: {
          ...styles,
          maxWidth: `100%`,
          height: 'min-content',
          overflow: 'hidden',
          width,
          p: 0,
          m: 0,
        },
        textarea: {
          ...styles,
          maxWidth: `100%`,
          height: 'min-content',
          width,
          p: 0,
          m: 0,
        },
        fieldset: {
          p: 0,
          m: 0,
          border: `none`,
        },
      }}
    />
  );
};
