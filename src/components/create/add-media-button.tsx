function AddMediaButton({
  children,
  ...props
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="h-8 w-8 rounded-full p-1 hover:bg-secondary hover:text-primary"
      disabled={false}
    >
      {children}
    </button>
  );
}

export default AddMediaButton;
