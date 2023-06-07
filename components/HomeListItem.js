import validUrl from 'valid-url';
import DOMPurify from 'dompurify';
import ImageDynamic from './ImageDynamic';
import TruncatedLink from '@/helpers/TruncatedLink';
import TruncatedTitle from '@/helpers/TruncatedTitle';
import TruncatedContent from '@/helpers/TruncatedContent';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const HomeListItem = ({ id, title, linkTag, imgHref, infoExcerpt, packPreviewUrl, isAdmin, loggedIn }) => {
  const samplepackUrl = `${baseUrl}/samplepack?id=${id}`;
  const loginUrl = `${baseUrl}/login`;
  const href = isAdmin || loggedIn ? samplepackUrl : loginUrl;

  const isValidHref = validUrl.isWebUri(href);

  function generateRandomDate() {
  const a = (Math.floor(Math.random() * 28) + 1).toString().padStart(2, '0'); // Random number between 1-28
  const b = (Math.floor(Math.random() * 12) + 1).toString().padStart(2, '0'); // Random number between 01-12
  const c = Math.floor(Math.random() * (2023 - 1996 + 1)) + 1996; // Random number between 1996-2023
  return `${a}:${b}:${c}`;
}

  return (
    <section key={id} className={`group bg-[#101010] p-0 flex max-w-xl flex-col`}>


      {/* IMAGES */}
      <div className="relative mb-5 sm:mb-4 flex w-full transition-all duration-500">
        {
          <ImageDynamic packPreviewUrl={packPreviewUrl} item={imgHref} isAdmin={isAdmin} isLoggedIn={loggedIn} isAdminImg={isAdmin} isHomeImg={loggedIn} id={id}/>
        }
      </div>
    
      

      {/* DATE AND URL (linkTag) */}
      {/* <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 pb-1.5 text-xs">
        <time dateTime={null} className="text-green-400">
          {DOMPurify.sanitize(generateRandomDate())}
        </time>
        {linkTag ? 
          (<a
            href={isValidHref ? href : null} className="relative z-10 sm:px-3 py-1.5 sm:py-0 font-medium text-gray-600 hover:bg-gray-100"> */}

            {/* {DOMPurify.sanitize(truncateTitle(linkTag, 25))} */}

            {/* <TruncatedLink info={linkTag} />
          </a>
          ) : (
            <span className="relative z-10 sm:px-3 py-1.5 sm:py-0 font-medium text-gray-600">{"http://presetloop.com"}</span>
            )
        }
      </div> */}


    

      {/* TITLE AND INFO-EXCERPT */}
        <h3 className="text-lg font-semibold sm:mt-0 leading-6 bg-[#101010] text-white transition-all duration-500">
          <a href={isValidHref ? href : null}>
          {title}
          {/* <TruncatedTitle info={title} /> */}
          </a>
        </h3>
        <div className="mt-1 mb-0 text-sm leading-5 bg-[#101010] text-white transition-all duration-500">
          {infoExcerpt?.replace(/<br\s*\/?>/gi, '')}
          {/* <TruncatedContent info={infoExcerpt?.replace(/<br\s*\/?>/gi, '')} /> */}
        </div>




      

    </section>
  );
};

export default HomeListItem;
