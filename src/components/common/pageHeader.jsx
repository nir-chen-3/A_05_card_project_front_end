function PageHeader({ title, description }) {
  return (
    <div className="my-3 text-center">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
export default PageHeader;
