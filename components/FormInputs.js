export default function FormInputs({handleSubmit, titleField, title, handleChange, titleErrorMessage, linkTag, handleLinkTagChange, linkErrorMessage, imgHref, handleImageInputChange, imageErrorMessage, content, contentErrorMessage, disableSubmitBtn, loading}) {
  return (
    <div className="max-w-[700px] w-[95%] m-auto">

    <div className="flex justify-end w-full border-t-2 border-slate-900">
      <a className="block my-0 bg-[#1A0123] px-12 text-lg text-white ease ease-in-out duration-300 hover:pl-8 hover:pr-8" href="/">View all</a>
    </div>
    <form onSubmit={handleSubmit}>
    
    <div className="relative">
      <input
        ref={titleField}
        required
        className="appearance-none border-slate-900 mb-8 border-b-[1px] w-full py-2 px-0 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="title"
        type="text"
        placeholder="Enter a title"
        name="Title"
        value={title}
        onChange={handleChange}
      />
      {titleErrorMessage && <p className="absolute bottom-[5px] left-0 mb-0 text-red-500 text-md">{titleErrorMessage}</p>}
    </div>
    

    <div className="relative">
      <input
        className="appearance-none border-slate-900 mb-8 border-b-[1px] w-full py-2 px-0 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="title"
        type="text"
        placeholder="Enter a link (optional)"
        value={linkTag}
        onChange={handleLinkTagChange}
        />
        {linkErrorMessage && <p className="absolute bottom-[5px] left-0 mb-0 text-red-500 text-md">{linkErrorMessage}</p>}
    </div>
    

    <div className="relative">
      <input
        className="appearance-none border-slate-900 mb-8 border-b-[1px] w-full py-2 px-0 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="title"
        type="text"
        placeholder="Enter an external image link (optional)"
        value={imgHref}
        onChange={handleImageInputChange}
      />
      {imageErrorMessage && <p className="absolute bottom-[5px] left-0 mb-0 text-red-500 text-md">{imageErrorMessage}</p>}
    </div>
    

    <div className="relative">
      <textarea
        required
        className="appearance-none border-slate-900 mt-9 border-[1px] w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-48 focus:shadow-outline"
        id="content"
        placeholder="Enter some content"
        name="Content"
        value={content}
        onChange={handleChange}
      />
      {contentErrorMessage && <p className="absolute bottom-[5px] left-2 mb-0 text-red-500 text-md">{contentErrorMessage}</p>}
    </div>


    <div className="mt-2 flex items-center justify-between">
    { !disableSubmitBtn ? <button
        className="border-slate-900 border-2 hover:bg-slate-900 hover:text-white font-bold py-0 px-4 text-lg focus:outline-none focus:shadow-outline ease-in-out duration-150"
        type="submit">{loading ? 'Tooting...' : 'Toot'}</button> 
      : <button disabled
        className="border-slate-900 border-2 hover:bg-slate-900 hover:text-white font-bold py-0 px-4 text-lg focus:outline-none focus:shadow-outline ease-in-out duration-150"
        type="submit">Toot</button> 
    } 
    </div>

  </form>
  </div>
  )
}