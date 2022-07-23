
export type ModalSize = "sm" | "md" | "lg" | "xl" | "fullscreen"
export interface ModalProps{
  show: boolean;
  onClose: () => void;
  size?: ModalSize
  clickOverlayToClose?: boolean;
  closeOnEsc: boolean;
  blurOverlay?: boolean;
  scrollContent?: boolean;
  animation?: "fade" | "slide";
  children: JSX.Element[] | JSX.Element;
}

export interface ModalHeaderProps {
  children: JSX.Element | JSX.Element[];
  className?: string;
}

export interface ModalBodyProps{
  children: JSX.Element | JSX.Element[];
  className?: string;
}

export interface ModalFooterProps{
  children: JSX.Element | JSX.Element[];
  className?: string;
}
