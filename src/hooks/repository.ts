import Cookies from "js-cookie";

export const useRepository = () => {
  const setData = (key: string, value: any) => {
    const parcedValue = JSON.stringify(value);

    Cookies.set(key, parcedValue);
  };

  const getData = (key: string) => {
    const data = Cookies.get(key);

    if (!data) return null;

    return JSON.parse(data);
  };

  return { setData, getData };
};
