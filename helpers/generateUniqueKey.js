export default function generateUniqueKey (prefix) {
  const timestamp = new Date().getTime();
  const randomString = Math.random().toString(36).substring(2, 8);
  return `${prefix}-${timestamp}-${randomString}`;
};