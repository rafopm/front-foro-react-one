import Head from "next/head";
//import Footer from "./Footer";
//import Menu from "./Menu";


export default function Layout({ children, title }) {
  return (
    <div>
      <Head>
        <title>JefArt {title ? `| ${title}` : ""}</title>
        <meta
          name="description"
          content="Catálogo de regalos para toda ocasión"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div>
          Menu
        </div>
        <div className="container">{children}</div>
        <div>
          Footer
        </div>
      </div>

    </div>
  );
}
