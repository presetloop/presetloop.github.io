import validUrl from 'valid-url';
import DOMPurify from 'dompurify';

const baseUrl = 'http://localhost:5000';

const HomeListItem = ({ id, title, contentExcerpt, loggedIn }) => {
  const postUrl = `${baseUrl}/post?id=${id}`;
  const loginUrl = `${baseUrl}/login`;
  const href = loggedIn ? postUrl : loginUrl;

  const isValidHref = validUrl.isWebUri(href);

  return (
    <div className="mb-6">
      <a href={isValidHref ? href : null}>
        <p className="bg-slate-200 md:w-fit px-4 p-2 text-xl">
          {DOMPurify.sanitize(title)}
        </p>
      </a>
      <p className="bg-slate-100 border-dashed border-b-4 border-slate-200 px-4 p-1 md:px-4 md:p-2 text-lg text-slate-700">
        {DOMPurify.sanitize(contentExcerpt.replace(/<br\s*\/?>/gi, ''))}
      </p>
    </div>
  );
};

export default HomeListItem;
