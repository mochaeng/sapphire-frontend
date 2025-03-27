function MediaPost({
  src,
  alt,
  ...props
}: { src: string; alt: string } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className="relative mt-3 flex max-h-post justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 -z-10 w-full bg-cover bg-center blur-lg filter"
        style={{ backgroundImage: `url(${src})` }}
      ></div>
      <img className="h-full max-h-post" src={src} alt={alt} />
    </div>
  );
}

export default MediaPost;
