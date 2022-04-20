export const createClickEvent = (): MouseEvent => new MouseEvent('click', { bubbles: true });
export const sleep = (time: number) => new Promise(resolve => setTimeout(resolve, time));
export const getTracer = (search: string): string => `[data-testid="${search}"]`;