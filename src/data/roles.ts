import _kebabCase from 'lodash/kebabCase';

export const ROLES = [
  "Front-end Developer",
"Back-end Developer",
"Content Creator",
"UI/UX Designer",
"Digital Marketing",
] as const;

export const ROLES_SLUGS = ROLES.reduce((acc, role) => {
  return {
    ...acc,
    [_kebabCase(role)]: role,
  }
}, {} as Record<string, typeof ROLES[number]>);