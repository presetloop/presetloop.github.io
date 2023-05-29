import validUrl from 'valid-url';
import DOMPurify from 'dompurify';
import ImageDynamic from './ImageDynamic';
import TruncatedLink from '@/helpers/TruncatedLink';
import TruncatedTitle from '@/helpers/TruncatedTitle';
import TruncatedContent from '@/helpers/TruncatedContent';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const HomeListItem = ({ id, title, linkTag, imgHref, contentExcerpt, isAdmin, loggedIn }) => {
  const postUrl = `${baseUrl}/post?id=${id}`;
  const loginUrl = `${baseUrl}/login`;
  const href = isAdmin || loggedIn ? postUrl : loginUrl;

  const isValidHref = validUrl.isWebUri(href);

  function generateRandomDate() {
  const a = (Math.floor(Math.random() * 28) + 1).toString().padStart(2, '0'); // Random number between 1-28
  const b = (Math.floor(Math.random() * 12) + 1).toString().padStart(2, '0'); // Random number between 01-12
  const c = Math.floor(Math.random() * (2023 - 1996 + 1)) + 1996; // Random number between 1996-2023
  return `${a}:${b}:${c}`;
}

  return (
    <section key={id} className={`group bg-white p-0 flex max-w-xl flex-col`}>


      {/* IMAGES */}
      <div className="relative mb-8 sm:mb-4 flex w-full transition-all duration-500">
        {
          <ImageDynamic item={imgHref} isAdmin={isAdmin} isLoggedIn={loggedIn} isAdminImg={isAdmin} isHomeImg={loggedIn} id={id}/>
        }
      </div>
    
      

      {/* DATE AND URL (linkTag) */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 pb-1.5 text-xs">
        <time dateTime={null} className="text-green-400">
          {DOMPurify.sanitize(generateRandomDate())}
        </time>
        {linkTag ? 
          (<a
            href={isValidHref ? href : null} className="relative z-10 sm:px-3 py-1.5 sm:py-0 font-medium text-gray-600 hover:bg-gray-100">
            {/* {DOMPurify.sanitize(truncateTitle(linkTag, 25))} */}
            <TruncatedLink content={linkTag} />
          </a>
          ) : (
            <span className="relative z-10 sm:px-3 py-1.5 sm:py-0 font-medium text-gray-600">{"http://presetloop.com"}</span>
            )
        }
      </div>


    

      {/* TITLE AND CONTENT EXCERPT */}
        <h3 className="text-lg font-semibold sm:mt-2 leading-6 bg-white text-blue-500 transition-all duration-500">
          <a href={isValidHref ? href : null}>
          <TruncatedTitle content={title} />
          </a>
        </h3>
        <div className="mt-3.5 mb-0 text-sm leading-5 text-gray-600 transition-all duration-500">
          <TruncatedContent content={contentExcerpt?.replace(/<br\s*\/?>/gi, '')} />
        </div>




      

    </section>
  );
};

export default HomeListItem;
