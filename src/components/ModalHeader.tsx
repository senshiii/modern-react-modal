import { css } from "@emotion/css";
import React, { FC } from "react";
import { ModalHeaderProps } from "../types";

const ModalHeader: FC<ModalHeaderProps> = (props) => {
  const modalHeaderStyles = css`
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  `;

  return (
    <div
      className={`${
        props.className ? props.className : ""
      } ${modalHeaderStyles}`}
    >
      {props.children}
    </div>
  );
};

export default ModalHeader;
