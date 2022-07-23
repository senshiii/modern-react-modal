import { css } from "@emotion/css";
import React, { FC, useContext } from "react";
import { ModalContext } from "../context/ModalContext";
import { ModalBodyProps } from "../types";

const ModalBody: FC<ModalBodyProps> = (props) => {
  const { scrollContent } = useContext(ModalContext);
  const classNames = [];
  classNames.push(css`
    margin: .3rem 0;
    overflow-y: ${scrollContent ? "auto" : "none"}
  `);
  if (props.className) classNames.push(props.className);
  return <div className={classNames.join(" ")}>{props.children}</div>;
};

export default ModalBody;
