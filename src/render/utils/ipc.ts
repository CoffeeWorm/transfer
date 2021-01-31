import { ipcRenderer } from 'electron';

export const serverIpc = (
  target: string,
  value: { [field: string]: any },
  sync = false
) => {
  const result = ipcRenderer[sync ? 'sendSync' : 'send']('server', {
    target,
    ...value,
  });
  console.log(result)
  return JSON.parse(result || '');
};

export const connectIpc = (
  target: string,
  value: { [field: string]: any },
  async = false
): void => {
  return ipcRenderer[async ? 'sendSync' : 'send']('connect', {
    target,
    ...value,
  });
};
