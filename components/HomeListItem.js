import validUrl from 'valid-url';
import { sanitize } from 'dompurify';
import ImageDynamic from './ImageDynamic';
// import getRandomColourClass, {random50, random100, random300, random400} from '@/helpers/getRandomColourClass';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const HomeListItem = ({ id, title, linkTag, imgHref, infoExcerpt, producer, genre, packPreviewUrl, isNew, isAdmin, loggedIn }) => {
  const samplepackUrl = `${baseUrl}/samplepack?id=${id}`;
  const loginUrl = `${baseUrl}/login`;
  const href = isAdmin || loggedIn ? samplepackUrl : loginUrl;

  const isValidHref = validUrl.isWebUri(href);



function getRandomColourClass(classesArray) {

  const randomIndex = Math.floor(Math.random() * classesArray.length);
    return classesArray[randomIndex];

}
  
  const random50 = ["bg-cyan-50", "bg-rose-50", "bg-fuchsia-50", "bg-emerald-50", "bg-teal-50", "bg-sky-50", "bg-violet-50", "bg-lime-50", "bg-amber-50"];

  const random100 = ["bg-cyan-100", "bg-rose-100", "bg-fuchsia-100", "bg-emerald-100", "bg-teal-100", "bg-sky-100", "bg-violet-100", "bg-lime-100", "bg-amber-100"];

  const random300 = ["bg-blue-300", "bg-red-300", "bg-pink-300", "bg-yellow-300", "bg-green-300", "bg-purple-300", "bg-indigo-300"];

  const random400 = ["bg-blue-400", "bg-red-400", "bg-pink-400", "bg-yellow-400", "bg-green-400", "bg-purple-400", "bg-indigo-400"];



  return (
    <section key={id} className={`group p-4 flex max-w-xl flex-col h-fit ${getRandomColourClass(random100)}`}>

      {/* IMAGES */}
      <div className="z-100 relative mb-2 sm:mb-1 flex w-full transition-all duration-500">
        {
          <ImageDynamic packPreviewUrl={packPreviewUrl} isNew={isNew} item={imgHref} isAdmin={isAdmin} isLoggedIn={loggedIn} isAdminImg={isAdmin} isHomeImg={loggedIn} id={id} href={isValidHref ? href : null} />
        }
      </div>

    
      <a href={isValidHref ? href : null}>


      <div className={`flex justify-between align-middle ${(loggedIn || isAdmin) ? "mt-2" : "mt-0.5"} pb-2 text-xs text-white`}>

      

        {/* PRODUCER */}
          <p className={`leading-[17px] rounded-sm ${getRandomColourClass(random400)} px-1 py-1`}>{sanitize(producer) || "Preset Loop"}</p>

        {/* GENRE */}
          <p className={`leading-[17px] rounded-sm ${getRandomColourClass(random400)} px-1 py-1`}>{sanitize(genre) || "Beats"}</p>
        
      </div>


    

      {/* TITLE AND INFO-EXCERPT */}
        <h3 className="text-lg font-semibold px-2 py-1 sm:mt-0 leading-6 bg-[#101010] text-white transition-all duration-500">
          
          {sanitize(title)}
          
        </h3>
        <div className="p-2 pb-2.5 mt-1 mb-0 text-sm leading-5 bg-[#101010] text-white transition-all duration-500">

          <p dangerouslySetInnerHTML={{ __html: sanitize(infoExcerpt.length === 100 ? sanitize(infoExcerpt?.replace(/<br\s*\/?>/gi, ''))+"..." : sanitize(infoExcerpt?.replace(/<br\s*\/?>/gi, '')))}}></p>

        </div>




    </a>

      

    </section>
  );
};

export default HomeListItem;
