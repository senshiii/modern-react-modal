import { FC, useContext, useEffect } from "react";
import { ModalContext } from "../context/ModalContext";

interface Props {
  scrollContent: boolean;
}

const ContextSetter: FC<Props> = ({ scrollContent }) => {
  const { setScrollContent } = useContext(ModalContext);
  useEffect(() => {
    setScrollContent(scrollContent);
  }, []);
  return null;
};

export default ContextSetter;
