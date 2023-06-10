import validUrl from 'valid-url';
import DOMPurify from 'dompurify';
import ImageDynamic from './ImageDynamic';
import generateRandomDate from '@/helpers/generateRandomDate';
import TruncatedLink from '@/helpers/TruncatedLink';
import TruncatedTitle from '@/helpers/TruncatedTitle';
import TruncatedInfo from '@/helpers/TruncatedInfo';
import getRandomColourClass from '@/helpers/GetRandomColourClass';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const HomeListItem = ({ id, title, linkTag, imgHref, infoExcerpt, producer, genre, packPreviewUrl, isAdmin, loggedIn }) => {
  const samplepackUrl = `${baseUrl}/samplepack?id=${id}`;
  const loginUrl = `${baseUrl}/login`;
  const href = isAdmin || loggedIn ? samplepackUrl : loginUrl;

  const isValidHref = validUrl.isWebUri(href);  

  const random50 = ["bg-blue-50", "bg-red-50", "bg-pink-50", "bg-yellow-50", "bg-green-50", "bg-purple-50", "bg-indigo-50", "bg-gray-50"];
  const random100 = ["bg-blue-100", "bg-red-100", "bg-pink-100", "bg-yellow-100", "bg-green-100", "bg-purple-100", "bg-indigo-100", "bg-gray-100"];
  const random300 = ["bg-blue-300", "bg-red-300", "bg-pink-300", "bg-yellow-300", "bg-green-300", "bg-purple-300", "bg-indigo-300", "bg-gray-300"];
  const random400 = ["bg-blue-400", "bg-red-400", "bg-pink-400", "bg-yellow-400", "bg-green-400", "bg-purple-400", "bg-indigo-400", "bg-gray-400"];  

  return (
    <section key={id} className={`group ${getRandomColourClass(random300)} p-4 flex max-w-xl flex-col h-fit`}>

      {/* IMAGES */}
      <div className="z-100 relative mb-2 sm:mb-1 flex w-full transition-all duration-500">
        {
          <ImageDynamic packPreviewUrl={packPreviewUrl} item={imgHref} isAdmin={isAdmin} isLoggedIn={loggedIn} isAdminImg={isAdmin} isHomeImg={loggedIn} id={id} href={isValidHref ? href : null} />
        }
      </div>

    
      <a href={isValidHref ? href : null}>


      <div className="flex justify-between align-middle mt-2 pb-3 sm:pb-2 text-xs text-white">

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
          <p className={`leading-[17px] rounded-sm ${getRandomColourClass(random400)} px-1 py-1`}>{producer || "Preset Loop"}</p>

        {/* GENRE */}
          <p className={`leading-[17px] rounded-sm ${getRandomColourClass(random400)} px-1 py-1`}>{genre || "Beats"}</p>
        
      </div>


    

      {/* TITLE AND INFO-EXCERPT */}
        <h3 className="text-lg font-semibold p-1 sm:mt-0 leading-6 bg-[#101010] text-white transition-all duration-500">
          
          {title}
          {/* <TruncatedTitle content={title} /> */}
          
        </h3>
        <div className="p-1 mt-1 mb-0 text-sm leading-5 bg-[#101010] text-white transition-all duration-500">
          {/* {infoExcerpt?.replace(/<br\s*\/?>/gi, '')} */}
          <TruncatedInfo content={infoExcerpt?.replace(/<br\s*\/?>/gi, '')} />
        </div>




    </a>

      

    </section>
  );
};

export default HomeListItem;
