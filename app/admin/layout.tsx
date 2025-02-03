export default function CheckLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="md-p-4">
      <div className="">{children}</div>
    </section>
  );
}
