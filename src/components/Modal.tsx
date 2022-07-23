import { css } from "@emotion/css";
import React, { FC, useEffect, useState } from "react";
import { ModalProps } from "../types";
import ModalContextProvider from "../context/ModalContext";
import ContextSetter from "./ContextSetter";

const allowedSubComponents = ["ModalHeader", "ModalBody", "ModalFooter"];

const Modal: FC<ModalProps> = ({
  show,
  scrollContent,
  size,
  effect,
  ...props
}) => {
  const [modalContenClassNames, setModalContenClassNames] = useState<string[]>(
    []
  );

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
        css`
          position: absolute;
          z-index: 100010;
          opacity: 0;
          top: ${size === "fullscreen" ? 0 : "10%"};
          left: ${50 - Math.round(width / 2)}%;
          width: ${width}%;
          min-height: ${size === "fullscreen" ? "100%" : "60%"};
          height: ${
            scrollContent ? (size === "fullscreen" ? "100%" : "auto") : "auto"
          };
          max-height: ${
            scrollContent ? (size == "fullscreen" ? "100%" : "80%") : "auto"
          }
          background: white;
          border-radius: ${size === "fullscreen" ? 0 : "8px"};
          padding: 1.4rem;
          margin-bottom: 4rem;
          box-shadow: 0 0 10px -4px #000;
          display: flex;
          flex-direction: column;
          justify-content: start;
          align-items: start;
        `,
      ]);
      // PREVENT DOCUMENT BODY SCROLLING
      document.body.style.overflow = "hidden";

      if (!!effect) {
        if (effect === "fade") {
          // Prepare Fade Effect
          setModalContenClassNames((prevClasses) => [
            ...prevClasses,
            css`
              opacity: 0;
              transform: scale(0.9);
            `,
          ]);
          setTimeout(() => {
            // Execute Fade Effect
            setModalContenClassNames((prevClasses) => [
              ...prevClasses,
              css`
                transition: all 100ms ease-in;
                transform: scale(1);
                opacity: 1;
              `,
            ]);
          }, 50);
        } else if (effect === "slide") {
          // Prepare Slide Effect
          setModalContenClassNames((prevClasses) => [
            ...prevClasses,
            css`
              top: 100vh;
              opacity: 1;
            `,
          ]);
          setTimeout(() => {
            // Execute Slide Effect
            setModalContenClassNames((prevClasses) => [
              ...prevClasses,
              css`
                transition: top 100ms ease-in;
                top: ${size === "fullscreen" ? 0 : "10%"};
              `,
            ]);
          }, 50);
        }
      } else {
        // NO EFFECTS REQUESTED. DISPLAY MODAL
        setModalContenClassNames((prevClasses) => [
          ...prevClasses,
          css`
            opacity: 1;
          `,
        ]);
      }
    } else {
      setModalContenClassNames([]);
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show, size]);

  const modalContainer = css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 100000;
    backdrop-filter: ${props?.blurOverlay ? "blur(10px)" : "none"};
  `;
  const modalContentContainer = css`
    width: 100%;
    height: 100%;
    overflow-y: auto;
    background: transparent;
    position: relative;
  `;

  let SubComponents = React.Children.map(
    props.children,
    (child: JSX.Element) => {
      if (allowedSubComponents.includes(child.type.name)) return child;
    }
  );

  console.log("Subcomponents", SubComponents);

  if (!SubComponents || SubComponents?.length === 0) {
    console.warn(
      "<Modal /> requires valid children. These include <ModalHeader />, <ModalFooter />, <ModalBody />, <ModalCloseButton />"
    );
  }

  if (!show) return null;

  return (
    <div className={modalContainer}>
      <div
        onClick={() => {
          if (props.clickOverlayToClose) props.onClose();
        }}
        className={modalContentContainer}
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
