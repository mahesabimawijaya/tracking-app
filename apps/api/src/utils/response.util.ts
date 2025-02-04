export function response(message: string, data: any, success: boolean) {
  return {
    message,
    data,
    success,
  };
}
