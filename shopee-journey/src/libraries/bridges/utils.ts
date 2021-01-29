export const withLog = (obj: any) => {
  for (const key in obj) {
    obj[key] = logWithKey(obj[key], key);
  }
  return obj;
};

const logWithKey = (func: Function, key: string) => (...args: any[]) => {
  console.log(`[Bridge Input][${key}]`, args);
  return func(...args).then((resp: any) => {
    console.log(`[Bridge Output][${key}]`, resp);
    return resp;
  });
};
