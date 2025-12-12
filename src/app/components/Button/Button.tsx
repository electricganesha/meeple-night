import * as React from "react";
import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";

type CustomVariant =
  | "contained"
  | "outlined"
  | "text"
  | "secondary"
  | "hero"
  | "muted"
  | "destructive"
  | "ghost"
  | "link";

type CustomSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "xxl"
  | "small"
  | "medium"
  | "large";

export interface ButtonProps extends Omit<MuiButtonProps, "variant" | "size"> {
  variant?: CustomVariant;
  size?: CustomSize;
}
// Map custom size to MUI size and sx
const sizeMap: Record<CustomSize, MuiButtonProps["size"]> = {
  xs: "small",
  sm: "small",
  small: "small",
  md: "medium",
  medium: "medium",
  lg: "large",
  large: "large",
  xl: "large",
  xxl: "large",
};

const sizeSx: Partial<Record<CustomSize, object>> = {
  xs: { fontSize: "0.65rem", px: 1, py: 0.1, minHeight: 22, minWidth: 22 },
  sm: { fontSize: "0.8rem", px: 1.5, py: 0.4, minHeight: 28, minWidth: 28 },
  small: {},
  md: { fontSize: "1rem", px: 2.5, py: 1, minHeight: 36, minWidth: 36 },
  medium: {},
  lg: { fontSize: "1.15rem", px: 3, py: 1.25, minHeight: 44, minWidth: 44 },
  large: {},
  xl: { fontSize: "1.5rem", px: 4, py: 2, minHeight: 64, minWidth: 64 },
  xxl: { fontSize: "1.85rem", px: 5, py: 2.5, minHeight: 80, minWidth: 80 },
};

const variantMap: Record<CustomVariant, MuiButtonProps["variant"]> = {
  contained: "contained",
  outlined: "outlined",
  text: "text",
  secondary: "contained",
  hero: "contained",
  muted: "contained",
  destructive: "contained",
  ghost: "text",
  link: "text",
};

const variantSx: Partial<Record<CustomVariant, object>> = {
  secondary: {
    backgroundColor: "var(--secondary)",
    color: "var(--secondary-foreground)",
    "&:hover": { backgroundColor: "var(--secondary-dark)" },
  },
  hero: {
    backgroundColor: "var(--primary)",
    color: "var(--primary-foreground)",
    fontWeight: "bold",
    fontSize: "1.1rem",
    "&:hover": {
      scale: "1.03",
      boxShadow: "var(--shadow-glow), 0 6px 24px rgba(0,0,0,0.12)",
    },
  },
  muted: {
    backgroundColor: "var(--muted)",
    color: "var(--muted-foreground)",
    "&:hover": { backgroundColor: "var(--muted-dark)" },
  },
  destructive: {
    backgroundColor: "var(--destructive)",
    color: "var(--destructive-foreground)",
    "&:hover": { backgroundColor: "var(--destructive-dark)" },
  },
  ghost: {
    backgroundColor: "transparent",
    color: "var(--primary)",
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "var(--grey-100)",
      color: "hsl(22, 95%, 55%)",
    },
  },
  link: {
    backgroundColor: "transparent",
    color: "var(--primary)",
    textDecoration: "underline",
    boxShadow: "none",
    "&:hover": { backgroundColor: "transparent", textDecoration: "underline" },
  },
  outlined: {
    borderColor: "hsl(38, 92%, 50%, 0.5)",
    color: "var(--primary)",
    backgroundColor: "transparent",
    "&:hover": {
      transform: "scale(1.03)",
      borderColor: "hsl(38, 92%, 50%)",
      backgroundColor: "rgba(255, 184, 0, 0.10)",
    },
  },
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "contained", size = "medium", sx, ...props }, ref) => {
    const muiSize = sizeMap[size] ?? "medium";
    const customSizeSx = sizeSx[size] ?? undefined;
    return (
      <MuiButton
        ref={ref}
        variant={variantMap[variant] ?? "contained"}
        size={muiSize}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          whiteSpace: "nowrap",
          fontFamily: "var(--font-nunito, Nunito, system-ui, sans-serif)",
          fontWeight: "bold",
          fontSize: "1.125rem", // text-lg
          height: "56px", // h-14
          borderRadius: "1rem", // rounded-xl
          px: 5, // px-10
          boxShadow: "var(--shadow-glow), 0 6px 24px rgba(0,0,0,0.12)", // shadow-lg glow-primary
          color: "var(--primary-foreground)",
          textTransform: "none",
          transition: "all 0.2s cubic-bezier(.4,1,.7,1)",
          outline: "none",
          // SVG child styles
          "& svg": {
            pointerEvents: "none",
            fontSize: "1.25rem",
            width: "1.25em",
            height: "1.25em",
            flexShrink: 0,
          },
          ...(variantSx[variant] ?? {}),
          ...(customSizeSx ?? {}),
          ...sx,
        }}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
