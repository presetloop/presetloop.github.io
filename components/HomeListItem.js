import validUrl from 'valid-url';
import DOMPurify from 'dompurify';
import ImageDynamic from './ImageDynamic';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const HomeListItem = ({ id, title, imgHref, contentExcerpt, loggedIn }) => {
  const postUrl = `${baseUrl}/post?id=${id}`;
  const loginUrl = `${baseUrl}/login`;
  const href = loggedIn ? postUrl : loginUrl;

  const isValidHref = validUrl.isWebUri(href);

  function getRandomNumber() {
    return Math.floor(Math.random() * 4) + 1;
  } 

  const randomImg = getRandomNumber();
  const randomImgUrl = `https://easycss.github.io/easyimage/img${randomImg}.png`;

  function truncateTitle(title, maxLength = null) {
    const length = maxLength ?? title.length;
    const sanitizedTitle = DOMPurify.sanitize(title.slice(0, length));
    const truncatedTitle = title.length > length ? `${sanitizedTitle}...` : sanitizedTitle;
    return truncatedTitle;
  }

  return (
    <article key={id} className="flex max-w-xl flex-col items-start justify-between">
      <div className="flex items-center gap-x-4 text-xs">
        <time dateTime={null} className="text-gray-500">
          {null}28.04.23
        </time>
        <a
          href={isValidHref ? href : null}
          className="relative z-10 bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
        >
          {truncateTitle(title, 30)}
        </a>
      </div>
      <div className="group relative">
        <h3 className="mt-2 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
          <a href={isValidHref ? href : null}>
            <span className="absolute inset-0" />
            {truncateTitle(title, 20)}
          </a>
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
          {DOMPurify.sanitize(contentExcerpt.replace(/<br\s*\/?>/gi, ''))+"..."}
        </p>
      </div>
      {/* spacing */}
      <div className="relative mt-0 flex w-full min-h-[275px] justify-center items-center gap-x-4">

      {
        imgHref ? (
          <ImageDynamic item={imgHref} isLoggedIn={loggedIn} isHomeImg={loggedIn} id={id}/>
          ) : (
          <img alt="Post Preview Image" className="h-[219px] w-[100vw] object-cover border-gray-100 border-[1px]" src={randomImgUrl} />
        ) 
      }


      </div>
    </article>
  );
};

export default HomeListItem;
