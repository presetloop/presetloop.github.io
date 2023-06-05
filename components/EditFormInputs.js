export default function EditFormInputs({data, handleSubmit, titleField, title, handleChange, titleErrorMessage, linkTag, handleLinkTagChange, linkErrorMessage, imgHref, handleImageInputChange, imageErrorMessage, content, contentErrorMessage, disableSubmitBtn, loading}) {
  return (
    
 <div className="max-w-[700px] w-[95%] m-auto">
  
    <div className="flex justify-end w-full mt-2 sm:mt-0 mb-4 sm:mb-2 border-t-2 border-slate-900">
      <a className="block my-0 bg-[#1A0123] px-12 text-lg text-white ease ease-in-out duration-300 sm:hover:pl-8 sm:hover:pr-8" href="/">View all</a>
    </div>




  <form onSubmit={handleSubmit}>
      {/* TITLE */}
    <div className="relative">
      <input
        ref={titleField}
        required
        className="appearance-none border-slate-900 mb-8 border-b-[1px] w-full py-2 px-0 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="title"
        type="text"
        placeholder={data?.title}
        name="Title"
        value={title}
        // onChange={(e) => setTitle(e.target.value)}
        onChange={handleChange}
      />
      {titleErrorMessage && <p className="absolute bottom-[5px] left-0 mb-0 text-red-500 text-md">{titleErrorMessage}</p>}
    </div>
    
      {/* LINKTAG */}
    <div className="relative">
      <input
        className="appearance-none border-slate-900 mb-8 border-b-[1px] w-full py-2 px-0 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="linkTag"
        type="text"
        placeholder={data ? data?.linkTag || "Enter a link (optional)" : "Enter a link (optional)"}
        name="LinkTag"
        value={linkTag}
        onChange={handleLinkTagChange}
      />
      {linkErrorMessage && <p className="absolute bottom-[5px] left-0 mb-0 text-red-500 text-md">{linkErrorMessage}</p>}
    </div>
    
      {/* IMGHREF */}
    <div className="relative">
      <input
        className="appearance-none border-slate-900 mb-8 border-b-[1px] w-full py-2 px-0 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="imgHref"
        type="text"
        placeholder={typeof window !== 'undefined' && window.innerWidth < 480 ? (!data ? "External image link (optional)" : "Enter an external image link (optional)") : (data?.imgHref || "Enter an external image link (optional)")}
        name="ImgHref"
        value={imgHref}
        onChange={handleImageInputChange}
      />
      {imageErrorMessage && <p className="absolute bottom-[5px] left-0 mb-0 text-red-500 text-md">{imageErrorMessage}</p>}
    </div>

    {/* CONTENT */}
    <div className="relative">
      <textarea
        required
        className="appearance-none border-slate-900 mt-9 border-[1px] w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-64 md:h-96 focus:shadow-outline"
        id="content"
        placeholder={data?.content}
        name="Content"
        value={content}
        // onChange={(e) => setContent(e.target.value)}
        onChange={handleChange}
      />
      {contentErrorMessage && <p className="absolute bottom-[5px] left-2 mb-0 text-red-500 text-md">{contentErrorMessage}</p>}
    </div>


      <div className="mt-2 flex items-center justify-between">
    { !disableSubmitBtn ? <button
        className="border-slate-900 border-2 hover:bg-slate-900 hover:text-white font-bold py-0 px-4 text-lg focus:outline-none focus:shadow-outline ease-in-out duration-150"
        type="submit">{loading ? 'Uploading...' : 'Upload'}</button> 
      : <button disabled
        className="border-slate-900 border-2 hover:bg-slate-900 hover:text-white font-bold py-0 px-4 text-lg focus:outline-none focus:shadow-outline ease-in-out duration-150"
        type="submit">Upload</button> 
    }
    </div>
 
    </form>


  
     


  </div>


  )
}