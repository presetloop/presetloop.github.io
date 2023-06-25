// Convert all links to https (onSubmit)
export default function addHttpsToLink(linkX) {
  let updatedLink = linkX;
  if (!updatedLink) return;
  // const pattern = /^(htps?:\/\/(ww?\.)*|htp:\/\/(ww?\.)*|http:\/\/(ww?\.)*|w\.)/i;
const pattern = /^(htps?:\/\/(ww?\.)*|htp:\/\/(ww?\.)*|http:\/\/(ww?\.)*|w{1,2}\.)/i;
  if (!linkX.startsWith("https://")) {
    (updatedLink = `https://${linkX.replace(pattern, (match) => {
    if (match.startsWith("w")) {
      return "www.";
    } else {
      return "";
    }
  })}`);
  }
  return updatedLink;
}