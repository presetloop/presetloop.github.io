import { useState } from 'react';
// import Image from 'next/image';
import DOMPurify from 'dompurify';
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
      <a href={DOMPurify.sanitize(`${baseUrl}/login`).replace(/^http?:\/\//i, convertToHttps)}
         rel="noopener noreferrer">
        
        { imgHref ? ( 
          <SoundFile isLoggedIn={isLoggedIn} soundFile={``} image={imgHref && validUrl.isWebUri(imgHref) && DOMPurify.sanitize(imgHref).replace(/^http?:\/\//i, convertToHttps)} />
          
          
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
          {/* NEW Label or empty */}
          { isNew ? (<span className='p-2 bg-green-400'>{isNew}</span> ) : (
            <span className='p-0 bg-red-400'>{}</span>
            )}
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
            image={imgHref && validUrl.isWebUri(imgHref) && DOMPurify.sanitize(imgHref).replace(/^http?:\/\//i, convertToHttps)} 
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
          { isNew ? (<span className='p-2 bg-green-400'>{isNew}</span> ) : (
            <span className='p-0 bg-red-400'>{}</span>
            )}
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
        <SoundFile isLoggedIn={isLoggedIn} isAdmin={isAdmin} soundFile={packPreviewUrl || ``} image={imgHref && validUrl.isWebUri(imgHref) && DOMPurify.sanitize(imgHref).replace(/^http?:\/\//i, convertToHttps)} style={`max-w-[100%] h-auto md:w-[650px] epic:w-[850px]`} />
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