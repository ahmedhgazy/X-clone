export function getTextDirection(text: string): 'rtl' | 'ltr' {
  const arabicCharPattern = /[\u0600-\u06FF\u0750-\u077F]/;
  return arabicCharPattern.test(text) ? 'rtl' : 'ltr';
}
