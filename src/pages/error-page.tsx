import { Link } from "react-router-dom";

function ErrorPage({ msg }: { msg?: string }) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-6 p-4 text-primaryOnly">
      <div className="flex flex-col gap-2 text-center">
        <span className="text-3xl font-bold">Sorry</span>
        <span className="text-lg font-bold">this page is not available</span>
      </div>
      <div className="flex flex-col gap-2 text-center">
        <span className="text-secondaryOnly">
          The link you followed may be broken, or the page may have been
          removed.
        </span>
        <Link to="/" className="text-primary underline">
          Go back to sapphire.com
        </Link>
        {msg}
      </div>
    </div>
  );
}

export default ErrorPage;
