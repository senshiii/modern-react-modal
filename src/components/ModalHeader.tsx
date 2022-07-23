import { css } from "@emotion/css";
import React, { FC } from "react";
import { ModalHeaderProps } from "../types";

const ModalHeader: FC<ModalHeaderProps> = (props) => {
  const modalHeaderStyles = css`
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    border-bottom: 1px solid rgba(0,0,0,.1)
  `;

  const modalHeaderContentStyles = css`
    flex: 1;
  `;

  return (
    <div className={modalHeaderStyles}>
      <div className={modalHeaderContentStyles}>{props.children}</div>
    </div>
  );
};

export default ModalHeader;
