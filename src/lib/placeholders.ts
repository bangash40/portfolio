// Content values starting with 'TODO:' are placeholders the owner has not filled in yet.
// Links and actions built from them are hidden instead of rendered broken.
export function isFilled(value: string | undefined): value is string {
  return !!value && !value.startsWith('TODO:');
}
