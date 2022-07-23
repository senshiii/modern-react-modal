import { css } from "@emotion/css";
import { ModalSize } from "../types";

export function baseStyles(
  size: ModalSize,
  width: number,
  scrollContent: boolean
): string {
  return css`
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
  `;
}

export function prepareFade(): string {
  return css`
    opacity: 0;
    transform: scale(0.9);
  `;
}

export function executeFade(): string {
  return css`
    transition: all 100ms ease-in;
    transform: scale(1);
    ${opacityOne()}
  `;
}

export function opacityOne(): string {
  return css`
    opacity: 1;
  `;
}

export function prepareSlide(): string {
  return css`
    top: 100vh;
    ${opacityOne()}
  `;
}

export function executeSlide(size: ModalSize): string {
  return css`
    transition: top 100ms ease-in;
    top: ${size === "fullscreen" ? 0 : "10%"};
  `;
}

export function modalContainer(blurOverlay: boolean): string {
  return css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 100000;
    backdrop-filter: ${blurOverlay ? "blur(10px)" : "none"};
  `;
}


export function modalContentContainer(): string {
  return css`
    width: 100%;
    height: 100%;
    overflow-y: auto;
    background: transparent;
    position: relative;
  `;
}
