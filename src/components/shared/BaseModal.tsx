import { ReactNode } from "react";
import styles from "./BaseModal.module.scss";
import { cx } from "../../utils/classNames";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  сlassName?: string;
  backgroundEffect?: ReactNode;
  children: ReactNode;
}

export const BaseModal = ({
  isOpen,
  onClose,
  сlassName,
  backgroundEffect,
  children,
}: BaseModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className={cx(styles.modalOverlay, сlassName)}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {backgroundEffect}
      {children}
    </div>
  );
};
