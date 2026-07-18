export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-site px-5 sm:px-8 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}
