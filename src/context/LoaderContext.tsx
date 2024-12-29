import { createContext, ReactNode, useContext, useState } from "react";

type LoaderContextProps = {
    isLoading: boolean
    start: () => void
    stop: () => void
    loaderText: string
};
  
export const LoaderContext = createContext<LoaderContextProps>({} as LoaderContextProps);

export const LoaderProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [loaderText, setLoaderText] = useState('');
  
    const start = (loaderText = 'Loader...') => {
      setLoaderText(loaderText)
      setIsLoading(true)
    };
  
    const stop = () => setIsLoading(false);
  
    return (
      <LoaderContext.Provider
        value={{
          isLoading,
          start,
          stop,
          loaderText
        }}
      >
        {children}
      </LoaderContext.Provider>
    )
  }
  // eslint-disable-next-line react-refresh/only-export-components
  export const useLoader = () => {
    const loaderContext = useContext(LoaderContext);
  
    if (!loaderContext) {
      throw new Error('Please use useLoader inside the context of LoaderProvider');
    }
  
    return loaderContext;
  };
  
