import DOMPurify from 'dompurify';

export default function truncateTitleArg(title, maxLength = null) {
  const length = maxLength ?? title.length;
  const sanitizedTitle = DOMPurify.sanitize(title.slice(0, length));
  const truncatedTitle = title.length > length ? `${sanitizedTitle}...` : sanitizedTitle;
  return truncatedTitle;
}