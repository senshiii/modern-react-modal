import React, { createContext, FC, useState } from "react";

interface ModalContextData {
  scrollContent: boolean;
  setScrollContent: (value: boolean) => void;
}

export const ModalContext = createContext<ModalContextData>({
  scrollContent: false,
  setScrollContent: () => {},
});

interface ProviderProps {
  children: JSX.Element | JSX.Element[];
}

const ModalContextProvider: FC<ProviderProps> = (props) => {
  const [scrollContent, setScrollContent] = useState<boolean>(false);
  const handleSetScollContent = (value: boolean) => setScrollContent(value)
  return (
    <ModalContext.Provider
      value={{
        scrollContent,
        setScrollContent: handleSetScollContent,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
