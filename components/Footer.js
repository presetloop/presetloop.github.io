export default function Footer() {
  return (
    <>
      <div className="mt-8 bg-[#111] p-8 sm:p-24">
        <div className="w-full flex justify-between">
          <p className="text-sm text-white">{process.env.NEXT_PUBLIC_STRAPLINE}</p>
          <p className="text-sm text-white">we don't do <span className="line-through">socials</span> but you can email us here <a className="text-indigo-100 sm:hover:text-indigo-200" href="mailto:oof@deploybedlam.com">{process.env.NEXT_PUBLIC_FOOTER_EMAIL}</a></p>
        </div>
      </div>
    </>
  )
}