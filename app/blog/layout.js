export const metadata = {
  title: 'Article | Blogs',
  description: 'Generated by create next app',
};

export default function BlogsLayout({ children }) {
  return <section className="px-5 py-20 md:py-24 md:max-w-screen-xl m-auto">{children}</section>;
}
