export default function FormInputs({handleSubmit, titleField, title, handleChange, titleErrorMessage, linkTag, handleLinkTagChange, linkErrorMessage, imgHref, handleImageInputChange, imageErrorMessage, content, contentErrorMessage, disableSubmitBtn, loading}) {
  return (
    <div className="max-w-[700px] w-[95%] m-auto">

    <div className="flex justify-end">
      <a className="block my-4 text-xl text-blue-700" href="/">View all</a>
    </div>
    <form onSubmit={handleSubmit}>
    <div className="mb-2">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
        Title
      </label>
      <input
        ref={titleField}
        required
        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="title"
        type="text"
        placeholder="Enter a title"
        name="Title"
        value={title}
        onChange={handleChange}
      />
      {titleErrorMessage && <p className="text-red-500 text-md">{titleErrorMessage}</p>}
    </div>
    
    <div className="mb-2">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="link">
        Link
      </label>
      <input
        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="title"
        type="text"
        placeholder="Enter a link (optional)"
        value={linkTag}
        onChange={handleLinkTagChange}
        />
      {linkErrorMessage && <p className="text-red-500 text-md">{linkErrorMessage}</p>}  
    </div>
    
    <div className="mb-2">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="image">
        Image
      </label>
      <input
        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="title"
        type="text"
        placeholder="Enter an external image link (optional)"
        value={imgHref}
        onChange={handleImageInputChange}
      />
      {imageErrorMessage && <p className="text-red-500 text-md">{imageErrorMessage}</p>}
    </div>
    
    <div className="mb-2">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="content">
        Content
      </label>
      <textarea
        required
        className="appearance-none border rounded w-full h-48 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="content"
        placeholder="Enter some content"
        name="Content"
        value={content}
        onChange={handleChange}
      />
      {contentErrorMessage && <p className="text-red-500 text-md">{contentErrorMessage}</p>}
    </div>
    <div className="flex items-center justify-between">
    { !disableSubmitBtn ? <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit">{loading ? 'Tooting...' : 'Toot'}</button> 
      : <button disabled
        className="bg-blue-100 hover:bg-blue-100 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit">Toot</button> 
    } 
    </div>
  </form>

  </div>
  )
}