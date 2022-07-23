import { css } from "@emotion/css";
import React, { FC, KeyboardEventHandler, useEffect, useState } from "react";
import { ModalProps } from "../types";
import ModalContextProvider from "../context/ModalContext";
import ContextSetter from "./ContextSetter";
import {
  baseStyles,
  executeFade,
  executeSlide,
  modalContainer,
  modalContentContainer,
  opacityOne,
  prepareFade,
  prepareSlide,
} from "./modal-styles";

const allowedSubComponents = ["ModalHeader", "ModalBody", "ModalFooter"];

const Modal: FC<ModalProps> = ({
  show,
  scrollContent,
  size,
  animation,
  ...props
}) => {
  const [modalContenClassNames, setModalContenClassNames] = useState<string[]>(
    []
  );

  const handleCloseOnEsc: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key == "Escape") props.onClose();
  };

  useEffect(() => {
    if (show) {
      // CALC WIDTH
      let width: number;
      switch (size) {
        case "sm":
          width = 20;
          break;
        case "md":
          width = 40;
          break;
        case "lg":
          width = 60;
          break;
        case "xl":
          width = 85;
          break;
        case "fullscreen":
          width = 100;
          break;
        default:
          width = 40;
      }
      // ADD BASE STYLING FOR MODAL CONTENT
      setModalContenClassNames((prevClasses) => [
        ...prevClasses,
        baseStyles(size ?? "md", width, !!scrollContent),
      ]);
      // PREVENT DOCUMENT BODY SCROLLING
      document.body.style.overflow = "hidden";

      if (!!animation) {
        if (animation === "fade") {
          // Prepare Fade Effect
          setModalContenClassNames((prevClasses) => [
            ...prevClasses,
            prepareFade(),
          ]);
          setTimeout(() => {
            // Execute Fade Effect
            setModalContenClassNames((prevClasses) => [
              ...prevClasses,
              executeFade(),
            ]);
          }, 50);
        } else if (animation === "slide") {
          // Prepare Slide Effect
          setModalContenClassNames((prevClasses) => [
            ...prevClasses,
            prepareSlide(),
          ]);
          setTimeout(() => {
            // Execute Slide Effect
            setModalContenClassNames((prevClasses) => [
              ...prevClasses,
              executeSlide(size ?? "md"),
            ]);
          }, 50);
        }
      } else {
        // NO EFFECTS REQUESTED. DISPLAY MODAL
        setModalContenClassNames((prevClasses) => [
          ...prevClasses,
          opacityOne(),
        ]);
      }
    } else {
      setModalContenClassNames([]);
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show, size, animation, scrollContent]);

  // Allowing only permitted children

  let SubComponents = React.Children.map(
    props.children,
    (child: JSX.Element) => {
      if (allowedSubComponents.includes(child.type.name)) return child;
    }
  );

  // Warning zero children passed
  if (!SubComponents || SubComponents?.length === 0) {
    console.warn(
      "<Modal /> requires valid children. These include <ModalHeader />, <ModalFooter />, <ModalBody />, <ModalCloseButton />"
    );
  }

  if (!show) return null;

  const modalContainerClassName = modalContainer(props.blurOverlay ?? false)
  const modalContentContainerClassName = modalContentContainer();

  return (
    <div className={modalContainerClassName} onKeyUp={handleCloseOnEsc}>
      <div
        onClick={() => {
          if (props.clickOverlayToClose) props.onClose();
        }}
        className={modalContentContainerClassName}
      >
        <div className={modalContenClassNames.join(" ")}>
          <ModalContextProvider>
            <ContextSetter scrollContent={scrollContent ?? false} />
            {/* <>{SubComponents?.map((children) => children)}</> */}
            <>{props.children}</>
          </ModalContextProvider>
        </div>
      </div>
    </div>
  );
};

export default Modal;
