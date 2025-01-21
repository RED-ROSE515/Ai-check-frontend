export default function AdminLayout({
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
