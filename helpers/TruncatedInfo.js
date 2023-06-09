import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import truncateString from './truncateString';
import truncateStringArg from './truncateStringArg';

function getTruncatedContent(content, windowWidth) {
  const cleanContentExcerpt = DOMPurify.sanitize(content?.replace(/<br\s*\/?>/gi, ''));

if (windowWidth < 640) {
    return truncateStringArg(cleanContentExcerpt,97);
  } else if (windowWidth < 660) {
    return truncateString(cleanContentExcerpt, 25);
  } else if (windowWidth < 690) {
    return truncateString(cleanContentExcerpt, 26);
  } else if (windowWidth < 710) {
    return truncateString(cleanContentExcerpt, 28);
  } else if (windowWidth < 745) {
    return truncateString(cleanContentExcerpt, 29);
  } else if (windowWidth < 1024) {
    return truncateString(cleanContentExcerpt, 31);
  } else if (windowWidth < 1080) {
    return truncateString(cleanContentExcerpt, 29);
  } else if (windowWidth < 1150) {
    return truncateString(cleanContentExcerpt, 29);
  } else if (windowWidth < 1190) {
    return truncateString(cleanContentExcerpt, 33);
  } else if (windowWidth < 1220) {
    return truncateString(cleanContentExcerpt, 33);
  } else if (windowWidth < 1295) {
    return truncateString(cleanContentExcerpt, 38);
  } else if (windowWidth < 1400) {
    return truncateString(cleanContentExcerpt, 38);
  } else if (windowWidth < 1480) {
    return truncateString(cleanContentExcerpt, 45);
  } else if (windowWidth < 1530) {
    return truncateString(cleanContentExcerpt, 47);
  } else {
    return truncateString(cleanContentExcerpt, 50);
  }
}

function TruncatedContent({ content }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const truncatedContent = getTruncatedContent(content, windowWidth);

  return <div>{truncatedContent}</div>;
}

export default TruncatedContent;