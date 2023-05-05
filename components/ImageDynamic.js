import { useEffect, useState } from 'react';
import Image from 'next/image';
import DOMPurify from 'dompurify';
import validUrl from 'valid-url';
import ImagePlaceholder from '@/components/ImagePlaceholder';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function ImageDynamic({ item = null, isLoggedIn = false, isHomeImg = false, id }) {
  const [className, setClassName] = useState('object-cover');
  
  const convertToHttps = "http://"; // CHANGE to https:// BEFORE BUILD AND DEPLOY
  const imgHref = item && item.imgHref || item;

// images when not logged in (redirects to /login)
  if (!isLoggedIn) {
    return (
      <a href={DOMPurify.sanitize(`${baseUrl}/login`).replace(/^http?:\/\//i, convertToHttps)}
         rel="noopener noreferrer">
        
        { imgHref ? ( 
  
          <Image
            className={`transition-all duration-500 mt-3 cursor-pointer ${className}`}
            src={imgHref && validUrl.isWebUri(imgHref) && DOMPurify.sanitize(imgHref).replace(/^http?:\/\//i, convertToHttps)}
            width={700}
            height={275}
            onError={() => setClassName('object-contain')}
            onLoad={(event) => {
              if (event.currentTarget.height < 275) {
                setClassName('object-contain');
              } else {
                setClassName('object-cover');
              }
            }}
            // loading="lazy"
            priority={true}
            alt={item?.title || 'No Image Available'}
          />

          ) : (
            <ImagePlaceholder width={"100vw"} className={className} imgkey={Math.random()} height={"275px"} />
          )
        }
      </a>
    );
  }

// home screen index images when logged in (link to post id)
  if (isHomeImg) {
    return (
      <a href={DOMPurify.sanitize(`${baseUrl}/post?id=${id}`).replace(/^http?:\/\//i, convertToHttps)}
         rel="noopener noreferrer">
        
        { imgHref ? ( 
  
          <Image
            className={`transition-all duration-500 mt-3 cursor-pointer ${className}`}
            src={imgHref && validUrl.isWebUri(imgHref) && DOMPurify.sanitize(imgHref).replace(/^http?:\/\//i, convertToHttps)}
            width={700}
            height={275}
            onError={() => setClassName('object-contain')}
            onLoad={(event) => {
              if (event.currentTarget.height < 275) {
                setClassName('object-contain');
              } else {
                setClassName('object-cover');
              }
            }}
            // loading="lazy"
            alt={item?.title || 'No Image Available'}
          />
          ) : (
            // remove width prop to keep the placeholder image square
            <ImagePlaceholder className={className} imgkey={Math.random()} height={"275px"} width={"100vw"} />
          )
        }
      </a>
    );
  }

// logged in article images.
  return (
    <a href={DOMPurify.sanitize(imgHref).replace(/^http?:\/\//i, convertToHttps)}
       target="_blank"
       rel="noopener noreferrer">
      
      { !item.imgHref ? (
        <ImagePlaceholder 
          className={`${className} mx-auto`}
          imgkey={Math.random()} 
          height={window.innerWidth < 800 ? "275px" : "770px"}
          rotate={"rotate(1deg)"}
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