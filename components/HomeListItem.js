import validUrl from 'valid-url';
import { sanitize } from 'dompurify';
import ImageDynamic from './ImageDynamic';
import getRandomColourClass, {random50, random100, random300, random400} from '@/helpers/GetRandomColourClass';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const HomeListItem = ({ id, title, linkTag, imgHref, infoExcerpt, producer, genre, packPreviewUrl, isNew, isAdmin, loggedIn }) => {
  const samplepackUrl = `${baseUrl}/samplepack?id=${id}`;
  const loginUrl = `${baseUrl}/login`;
  const href = isAdmin || loggedIn ? samplepackUrl : loginUrl;

  const isValidHref = validUrl.isWebUri(href);

  return (
    <section key={id} className={`group ${getRandomColourClass(random300)} p-4 flex max-w-xl flex-col h-fit`}>

      {/* IMAGES */}
      <div className="z-100 relative mb-2 sm:mb-1 flex w-full transition-all duration-500">
        {
          <ImageDynamic packPreviewUrl={packPreviewUrl} isNew={isNew} item={imgHref} isAdmin={isAdmin} isLoggedIn={loggedIn} isAdminImg={isAdmin} isHomeImg={loggedIn} id={id} href={isValidHref ? href : null} />
        }
      </div>

    
      <a href={isValidHref ? href : null}>


      <div className={`flex justify-between align-middle ${(loggedIn || isAdmin) ? "mt-2" : "mt-0"} pb-2 text-xs text-white`}>

      

        {/* PRODUCER */}
          <p className={`leading-[17px] rounded-sm ${getRandomColourClass(random400)} px-1 py-1`}>{sanitize(producer) || "Preset Loop"}</p>

        {/* GENRE */}
          <p className={`leading-[17px] rounded-sm ${getRandomColourClass(random400)} px-1 py-1`}>{sanitize(genre) || "Beats"}</p>
        
      </div>


    

      {/* TITLE AND INFO-EXCERPT */}
        <h3 className="text-lg font-semibold p-1 sm:mt-0 leading-6 bg-[#101010] text-white transition-all duration-500">
          
          {sanitize(title)}
          {/* <TruncatedTitle content={title} /> */}
          
        </h3>
        <div className="p-1 mt-1 mb-0 text-sm leading-5 bg-[#101010] text-white transition-all duration-500">
          {infoExcerpt.length === 100 ? sanitize(infoExcerpt?.replace(/<br\s*\/?>/gi, ''))+"..." : sanitize(infoExcerpt?.replace(/<br\s*\/?>/gi, ''))}
          {/* <TruncatedInfo content={sanitize(infoExcerpt?.replace(/<br\s*\/?>/gi, ''))} /> */}
        </div>




    </a>

      

    </section>
  );
};

export default HomeListItem;
