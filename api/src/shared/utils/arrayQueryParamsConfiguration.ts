const arrayQueryParamsConfiguration = <T>(element: string | undefined): T[] => {
  let filterElement: T[];
  if (element) {
    if (String(element).indexOf('[') !== -1) {
      filterElement = JSON.parse(String(element));
    } else {
      filterElement = String(element)
        .replace(/[\\"]/g, '')
        .split(',')
        .map(elem => elem as unknown as T);
    }
  }

  return filterElement;
};

export { arrayQueryParamsConfiguration };
