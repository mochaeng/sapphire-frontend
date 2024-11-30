function TextPost({
  children,
  ...props
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className="px-4">
      {children}
    </div>
  );
}

export default TextPost;
