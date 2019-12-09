import { useEffect } from 'react';

const useUpdateTitle = (title: string): void => {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = `${title} | ${originalTitle}`;
    return (): void => {
      document.title = originalTitle;
    };
  }, [title]);
};
export default useUpdateTitle;
