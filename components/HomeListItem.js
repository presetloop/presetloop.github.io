import validUrl from 'valid-url';
import DOMPurify from 'dompurify';
import ImageDynamic from './ImageDynamic';
import TruncatedLink from '@/helpers/TruncatedLink';
import TruncatedTitle from '@/helpers/TruncatedTitle';
import TruncatedContent from '@/helpers/TruncatedContent';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const HomeListItem = ({ id, title, linkTag, imgHref, contentExcerpt, loggedIn }) => {
  const postUrl = `${baseUrl}/post?id=${id}`;
  const loginUrl = `${baseUrl}/login`;
  const href = loggedIn ? postUrl : loginUrl;

  const isValidHref = validUrl.isWebUri(href);

  function generateRandomDate() {
  const a = (Math.floor(Math.random() * 28) + 1).toString().padStart(2, '0'); // Random number between 1-28
  const b = (Math.floor(Math.random() * 12) + 1).toString().padStart(2, '0'); // Random number between 01-12
  const c = Math.floor(Math.random() * (2023 - 1996 + 1)) + 1996; // Random number between 1996-2023
  return `${a}:${b}:${c}`;
}

  return (
    <section key={id} className={`bg-slate-50 p-4 flex max-w-xl flex-col`}>


      {/* date and linkTag */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 text-xs">
        <time dateTime={null} className="text-gray-500">
          {DOMPurify.sanitize(generateRandomDate())}
        </time>
        {linkTag ? 
          (<a
            href={isValidHref ? href : null} className="relative z-10 sm:px-3 bg-gray-50 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
            {/* {DOMPurify.sanitize(truncateTitle(linkTag, 25))} */}
            <TruncatedLink content={linkTag} />
          </a>
          ) : (
            <span className="relative z-10 sm:px-3 bg-gray-50 py-1.5 font-medium text-gray-600 hover:bg-gray-100">{":)"}</span>
            )
        }
      </div>


    

      {/* title and content excerpt */}
      <div className="mt-0 group">
      
        <h3 className="text-lg font-semibold leading-6 bg-white text-gray-900 group-hover:bg-gray-100 transition-all duration-500">
          <a href={isValidHref ? href : null}>
          <TruncatedTitle content={title} />
          </a>
        </h3>
        <div className="my-1 mb-0 text-sm leading-5 text-gray-600 group-hover:bg-gray-100 transition-all duration-500">
          <TruncatedContent content={contentExcerpt.replace(/<br\s*\/?>/gi, '')} />
        </div>




      {/* images */}
      <div className="relative my-0 flex w-full min-h-[275px] group-hover:bg-gray-100 transition-all duration-500">
        {
          <ImageDynamic item={imgHref} isLoggedIn={loggedIn} isHomeImg={loggedIn} id={id}/>
        }
      </div>
    
      </div>{/* \group for hover accent */}

    </section>
  );
};

export default HomeListItem;
