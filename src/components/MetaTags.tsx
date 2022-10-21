// import Head from "next/head";

const url: string = "https://piery.vercel.app/";
const title: string = "🥧 πery | Piery 🥧";
const description: string = "Fresh baked PI from your browser!";
const imageUrl: string =
  "https://raw.githubusercontent.com/richeyphu/piery/main/public/cover.png";

const MetaTags = () => {
  return (
    <>
      {/* <!-- Facebook Meta Tags --> */}
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content="{description}" />
      <meta property="og:image" content={imageUrl} />

      {/* <!-- Twitter Meta Tags --> */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="piery.vercel.app" />
      <meta property="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </>
  );
};

export default MetaTags;
