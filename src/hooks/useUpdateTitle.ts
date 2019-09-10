import { useEffect } from 'react';

const useUpdateTitle = (title: string) => {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = `${title} | ${originalTitle}`;
    return () => {
      document.title = originalTitle;
    };
  }, [title]);
};
export default useUpdateTitle;
