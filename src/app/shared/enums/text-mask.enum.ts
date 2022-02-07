export enum TextMaskValues {
  Date = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] as any,
  Phone = [/[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/] as any,
  Postal = [/\d/, /\d/, /\d/, /\d/, /\d/] as any,
}
