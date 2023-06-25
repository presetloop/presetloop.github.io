import DynamicFormInput from './DynamicFormInput';

export default function SamplePackFormInputs({ titleField, title, handleChange, titleErrorMessage, linkTag, handleLinkTagChange, linkErrorMessage, imgHref, handleImageInputChange, imageErrorMessage, info, infoErrorMessage, formData, setFormData }) {
  
  return (

    <>
    {/* TITLE */}
    <div className="relative">
      <input
        ref={titleField}
        required
        className="appearance-none border-slate-900 mb-8 border-b-[1px] w-full py-2 px-0 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="title"
        type="text"
        placeholder="Enter a Sample Pack Name"
        name="Title"
        value={title}
        onChange={handleChange}
      />
      {titleErrorMessage && <p className="absolute bottom-[5px] left-0 mb-0 text-red-500 text-md">{titleErrorMessage}</p>}
    </div>

    {/* SUB_TITLE */}
    <DynamicFormInput dbName="sub_title" placeholder="Sub Title (optional)" formData={formData} setFormData={setFormData} />

    {/* LINK */}
    <div className="relative">
      <input
        className="appearance-none border-slate-900 mb-8 border-b-[1px] w-full py-2 px-0 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="linkTag"
        type="text"
        placeholder="Enter a Link (optional)"
        value={linkTag}
        onChange={handleLinkTagChange}
        />
        {linkErrorMessage && <p className="absolute bottom-[5px] left-0 mb-0 text-red-500 text-md">{linkErrorMessage}</p>}
    </div>
    
    {/* IMAGE LINK */}
    <div className="relative">
    <input
      className="appearance-none border-slate-900 mb-8 border-b-[1px] w-full py-2 px-0 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id="imgHref"
      type="text"
      placeholder={typeof window !== 'undefined' && window.innerWidth < 480 ? "External image link (optional)" : "Enter an External Image Link (optional)"}
      value={imgHref}
      onChange={handleImageInputChange}
    />
    {imageErrorMessage && <p className="absolute bottom-[5px] left-0 mb-0 text-red-500 text-md">{imageErrorMessage}</p>}
  </div>

    {/* INFO */}
    <div className="relative">
      <textarea
        required
        className="appearance-none border-slate-900 my-4 mb-8 border-[1px] w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-64 md:h-96 focus:shadow-outline"
        id="info"
        placeholder="Enter some info"
        name="Info"
        value={info}
        onChange={handleChange}
      />
      {infoErrorMessage && <p className="absolute bottom-[5px] left-2 mb-0 text-red-500 text-md">{infoErrorMessage}</p>}
    </div>

 </>
 
  )
}