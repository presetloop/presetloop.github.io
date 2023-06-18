import { useState } from 'react';
// import Image from 'next/image';
import { sanitize } from 'dompurify';
import validUrl from 'valid-url';
import SoundFile from '@/components/SoundFile';
import ImagePlaceholder from '@/components/ImagePlaceholder';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
// const imagePlaceholderUrl = "https://images.presetloops.com/placeholder";

export default function ImageDynamic({ href, item = null, packPreviewUrl, isAdmin = false, isLoggedIn = false, isHomeImg = false, isAdminImg = false, id, isNew }) {

  const [className, setClassName] = useState('object-cover');
  
  const convertToHttps = "http://"; // CHANGE to https:// BEFORE BUILD AND DEPLOY
  const imgHref = item && item.imgHref || item;

// images when not logged in (redirects to /login)
  if ((!isLoggedIn === true) && !isAdmin) {
    return (
      <a href={sanitize(`${baseUrl}/login`).replace(/^http?:\/\//i, convertToHttps)}
         rel="noopener noreferrer">
        
        { imgHref ? ( 
          <SoundFile isLoggedIn={isLoggedIn} soundFile={``} image={imgHref && validUrl.isWebUri(imgHref) && sanitize(imgHref).replace(/^http?:\/\//i, convertToHttps)} />
          
          
          ) : (
            <ImagePlaceholder 
              imgkey={Math.random()} 
              // width={"100%"} 
              // height={"95%"} 
              onError={() => setClassName('object-contain')}
              onLoad={(event) => {
                if (event.currentTarget.height < 275) {
                  setClassName('object-contain');
                } else {
                  setClassName('object-cover');
                }
              }}
              className={`relative rounded-md sm:group-hover:rounded-full transition-all duration-500 sm:hover:duration-1000 mt-3 cursor-pointer ${className}`}
            />
          )
        }
        <span className='absolute -right-0 top-1.5 text-white text-sm'>
        <span className='p-0'>
        {/* Labels: New, P.O.T.W, coming soon or empty */}
          {
            isNew === "New" ?
            <span className='p-2 bg-green-400'>{sanitize(isNew)}</span> :
            isNew === "P.O.T.W" ?
            <span className='p-2 bg-yellow-400'>{sanitize(isNew)}</span> :
            isNew === "coming soon" ?
            <span className='p-2 bg-black'>{sanitize(isNew)}</span> :
            null
          }
        </span>
        </span>

        

      </a>
    );
  }

// home screen index images when logged in (link to samplepack id)
  if (isHomeImg || isAdminImg) {
    return (
      <>
        
        { imgHref ? ( 
          <SoundFile 
            href={href}
            isLoggedIn={isLoggedIn} 
            isAdmin={isAdmin} 
            soundFile={packPreviewUrl || ``} 
            image={imgHref && validUrl.isWebUri(imgHref) && sanitize(imgHref).replace(/^http?:\/\//i, convertToHttps)} 
          />


          ) : (
            // remove width prop to keep the placeholder image square
            <ImagePlaceholder 
              imgkey={Math.random()} 
              // width={"100%"} 
              // height={"95%"} 
              onError={() => setClassName('object-contain')}
              onLoad={(event) => {
                if (event.currentTarget.height < 275) {
                  setClassName('object-contain');
                } else {
                  setClassName('object-cover');
                }
              }}
              className={`rounded-md sm:group-hover:rounded-full transition-all duration-500 cursor-pointer ${className}`}
            />
          )
        }
        <span className='absolute -right-0 top-1.5 text-white text-sm'>
          <span className='p-0'>
          {/* NEW Label or empty */}
          {
            isNew === "New" ?
            <span className='p-2 bg-green-400'>{sanitize(isNew)}</span> :
            isNew === "P.O.T.W" ?
            <span className='p-2 bg-yellow-400'>{sanitize(isNew)}</span> :
            isNew === "coming soon" ?
            <span className='p-2 bg-black'>{sanitize(isNew)}</span> :
            null
          }
        </span>
        </span>
        
      
      {/* </a> */}
      </>
    );
  }

// logged in article images.
  return (
    <>
      { item.imgHref ? (
        <SoundFile isLoggedIn={isLoggedIn} isAdmin={isAdmin} soundFile={packPreviewUrl || ``} image={imgHref && validUrl.isWebUri(imgHref) && sanitize(imgHref).replace(/^http?:\/\//i, convertToHttps)} style={`max-w-[100%] h-auto md:w-[650px] epic:w-[850px]`} />
      ) : ( 
        <ImagePlaceholder 
          className={`transition-all duration-500 sm:mt-4 cursor-pointer ${className} w-[100%] h-auto max-w-[700px]`}
          // height={window.innerWidth < 800 ? "275px" : "100%"}
          imgkey={Math.random()} 
          rotate={"rotate(1deg)"}
          alt={'No Image Available'}
        />
      )
      }
      </>     
    // </a>
  );
}