import validUrl from 'valid-url';
import DOMPurify from 'dompurify';
import ImageDynamic from './ImageDynamic';
import generateRandomDate from '@/helpers/generateRandomDate';
import TruncatedLink from '@/helpers/TruncatedLink';
import TruncatedTitle from '@/helpers/TruncatedTitle';
import TruncatedInfo from '@/helpers/TruncatedInfo';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const HomeListItem = ({ id, title, linkTag, imgHref, infoExcerpt, producer, genre, packPreviewUrl, isAdmin, loggedIn }) => {
  const samplepackUrl = `${baseUrl}/samplepack?id=${id}`;
  const loginUrl = `${baseUrl}/login`;
  const href = isAdmin || loggedIn ? samplepackUrl : loginUrl;

  const isValidHref = validUrl.isWebUri(href);  

  return (
    <section key={id} className={`group bg-[#101010] p-0 flex max-w-xl flex-col`}>


      {/* IMAGES */}
      <div className="relative mb-2 sm:mb-1 flex w-full transition-all duration-500">
        {
          <ImageDynamic packPreviewUrl={packPreviewUrl} item={imgHref} isAdmin={isAdmin} isLoggedIn={loggedIn} isAdminImg={isAdmin} isHomeImg={loggedIn} id={id}/>
        }
      </div>
    
      

      <div className="flex justify-between align-middle pb-3 sm:pb-2 text-xs text-white">

      {/* DATE AND URL (linkTag) */}
       
        {/* <time dateTime={null} className="text-green-400">
          {DOMPurify.sanitize(generateRandomDate())}
        </time> */}
        {/* {linkTag ? 
          (<a
            href={isValidHref ? href : null} className="relative z-10 sm:px-3 py-1.5 sm:py-0 font-medium text-gray-600 hover:bg-gray-100">

            {DOMPurify.sanitize(truncateTitle(linkTag, 25))}

            <TruncatedLink info={linkTag} />
          </a>
          ) : (
            <span className="relative z-10 sm:px-3 py-1.5 sm:py-0 font-medium text-gray-600">{"http://presetloop.com"}</span>
            )
        } */}


        {/* PRODUCER */}
          <p className="leading-[17px] rounded-sm bg-green-400 px-1 py-1">{producer || "Preset Loop"}</p>

        {/* GENRE */}
          <p className="leading-[17px] rounded-sm bg-red-400 px-1 py-1">{genre || "Beats"}</p>
        
      </div>


    

      {/* TITLE AND INFO-EXCERPT */}
        <h3 className="text-lg font-semibold sm:mt-0 leading-6 bg-[#101010] text-white transition-all duration-500">
          <a href={isValidHref ? href : null}>
          {title}
          {/* <TruncatedTitle content={title} /> */}
          </a>
        </h3>
        <div className="mt-1 mb-0 text-sm leading-5 bg-[#101010] text-white transition-all duration-500">
          {/* {infoExcerpt?.replace(/<br\s*\/?>/gi, '')} */}
          <TruncatedInfo content={infoExcerpt?.replace(/<br\s*\/?>/gi, '')} />
        </div>




      

    </section>
  );
};

export default HomeListItem;
