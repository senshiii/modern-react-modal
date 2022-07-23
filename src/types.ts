export interface ModalProps{
  show: boolean;
  onClose: () => void;
  size?: "sm" | "md" | "lg" | "xl" | "fullscreen"
  clickOverlayToClose?: boolean;
  blurOverlay?: boolean;
  scrollContent?: boolean;
  effect?: "fade" | "slide";
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
