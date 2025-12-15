import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.scss";
import { cx } from "../../utils/classNames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
}

export const Button = ({ className, children, ...props }: ButtonProps) => {
  return (
    <button className={cx(styles.button, className)} {...props}>
      {children}
    </button>
  );
};
