function orderBy<T>(list: any[], field: any, ask: boolean): T[] {
  const askValue = ask ? 1 : -1;
  return list.sort((a, b) => {
    if (a[field] < b[field]) {
      return -1 * askValue;
    }
    if (a[field] > b[field]) {
      return 1 * askValue;
    }
    return 0
  })
}

function search<T>(list: any[], field: any, searchValue: string): T[] {
  return list.filter(item => {
    const itemField = item[field] as string;
    return itemField.toLowerCase().includes(searchValue.toLowerCase());
  })
}

export const ListUtil = {
  orderBy,
  search,
}