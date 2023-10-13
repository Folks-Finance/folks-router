export const getFormattedValue = (value: number) => `$ ${new Intl.NumberFormat("en-US").format(value).toString()}`;
