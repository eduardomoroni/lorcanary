import kebapCase from "lodash/kebabCase";

export function cardNameToUrlSafeString(name: string, title?: string) {
  const fullName = cardFullName(name, title);
  const kebabCaseName = kebapCase(fullName);

  return kebabCaseName
    .replace(/ /g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "")
    .toLowerCase();
}

export function cardFullName(name: string, title?: string) {
  return title ? `${name} - ${title}` : name;
}
