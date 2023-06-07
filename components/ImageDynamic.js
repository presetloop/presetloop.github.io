import { useState } from 'react';
import Image from 'next/image';
import DOMPurify from 'dompurify';
import validUrl from 'valid-url';
import SoundFile from '@/components/SoundFile';
import ImagePlaceholder from '@/components/ImagePlaceholder';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const imagePlaceholderUrl = "https://images.presetloops.com/placeholder";

export default function ImageDynamic({ item = null, packPreviewUrl, isAdmin = false, isLoggedIn = false, isHomeImg = false, isAdminImg = false, id }) {

  const [className, setClassName] = useState('object-cover');
  
  const convertToHttps = "http://"; // CHANGE to https:// BEFORE BUILD AND DEPLOY
  const imgHref = item && item.imgHref || item;

  const getRandomValue = (x,y) => {
    const randomNum = Math.random();
    return randomNum > 0.5 ? x : y || randomNum< 0.5 ? y : x;
  };

// images when not logged in (redirects to /login)
  if ((!isLoggedIn === true) && !isAdmin) {
    return (
      <a href={DOMPurify.sanitize(`${baseUrl}/login`).replace(/^http?:\/\//i, convertToHttps)}
         rel="noopener noreferrer">
        
        { imgHref ? ( 
          <SoundFile isLoggedIn={isLoggedIn} soundFile={``} image={imgHref && validUrl.isWebUri(imgHref) && DOMPurify.sanitize(imgHref).replace(/^http?:\/\//i, convertToHttps)} />
          
          // <Image
          //   className={`relative rounded-xl sm:group-hover:rounded-full transition-all duration-1000 group-hover:duration-0 mt-3 cursor-pointer ${className}`}
          //   src={imgHref && validUrl.isWebUri(imgHref) && DOMPurify.sanitize(imgHref).replace(/^http?:\/\//i, convertToHttps)}
          //   width={500}
          //   height={275}
          //   onError={() => setClassName('object-contain')}
          //   onLoad={(event) => {
          //     if (event.currentTarget.height < 275) {
          //       setClassName('object-contain');
          //     } else {
          //       setClassName('object-cover');
          //     }
          //   }}
          //   // loading="lazy"
          //   priority={true}
          //   alt={item?.title || 'No Image Available'}
          // />

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
              className={`relative rounded-md sm:group-hover:rounded-full transition-all duration-500 hover:duration-1000 mt-3 cursor-pointer ${className}`}
            />
          )
        }
        <span className='absolute -right-0 top-1.5 text-white text-sm'>
          <span className='p-0'>
          {getRandomValue(
            <span className='p-0 bg-red-400'>{""}</span>,
            <span className='p-2 bg-green-400'>New</span>
          )}
          </span>
        </span>

        
        {/* <span className='absolute left-0 bottom-0 bg-green-400 text-white text-sm px-1 py-1'><svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={0} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
        </svg></span> */}
      </a>
    );
  }

// home screen index images when logged in (link to samplepack id)
  if (isHomeImg || isAdminImg) {
    return (
      <>
      {/* <a href={DOMPurify.sanitize(`${baseUrl}/samplepack?id=${id}`).replace(/^http?:\/\//i, convertToHttps)} rel="noopener noreferrer"> */}
        
        { imgHref ? ( 
          <SoundFile isLoggedIn={isLoggedIn} isAdmin={isAdmin} soundFile={packPreviewUrl || "https://samples.presetloops.com/frazzles_loop1.mp3"} image={imgHref && validUrl.isWebUri(imgHref) && DOMPurify.sanitize(imgHref).replace(/^http?:\/\//i, convertToHttps)} />
          // <Image
          //   className={`relative rounded-md sm:group-hover:rounded-full transition-all duration-1000 group-hover:duration-0 mt-3 cursor-pointer ${className}`}
          //   src={imgHref && validUrl.isWebUri(imgHref) && DOMPurify.sanitize(imgHref).replace(/^http?:\/\//i, convertToHttps)}
          //   width={700}
          //   height={275}
          //   onError={() => setClassName('object-contain')}
          //   onLoad={(event) => {
          //     if (event.currentTarget.height < 275) {
          //       setClassName('object-contain');
          //     } else {
          //       setClassName('object-cover');
          //     }
          //   }}
          //   // loading="lazy"
          //   alt={item?.title || 'No Image Available'}
          // />

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
          {getRandomValue(
            <span className='p-0 bg-red-400'>{""}</span>,
            <span className='p-2 bg-green-400'>New</span>
          )}
          </span>
        </span>
        
        {/* <span className='absolute left-0 bottom-0 bg-green-400 text-white text-sm px-1 py-1'><svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={0} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
        </svg></span> */}
      
      {/* </a> */}
      </>
    );
  }

// logged in article images.
  return (
    <a href={!item.imgHref ? imagePlaceholderUrl : DOMPurify.sanitize(imgHref).replace(/^http?:\/\//i, convertToHttps)}
       target="_blank"
       rel="noopener noreferrer">
      
      { !item.imgHref ? (
        <ImagePlaceholder 
          className={`transition-all duration-500 sm:mt-4 cursor-pointer ${className} w-[100%] h-[100%] max-w-[700px]`}
          // height={window.innerWidth < 800 ? "275px" : "100%"}
          imgkey={Math.random()} 
          rotate={"rotate(1deg)"}
          alt={'No Image Available'}
        />
      ) : ( 
        <Image
          className={`transition-all duration-500 sm:mt-4 rotate-1 cursor-pointer ${className} sm:w-[48rem] max-w-[700px]`}
          src={
            imgHref &&
            validUrl.isWebUri(imgHref) &&
            DOMPurify.sanitize(imgHref).replace(/^http?:\/\//i, convertToHttps)
          }
          alt={item?.title || 'No Image Available'}
          width={300}
          height={275}
          sizes="(min-width: 700px) 700px, 100vw"
          loading="lazy"
          layout="responsive"
        /> 
      )
      }
    </a>
  );
}