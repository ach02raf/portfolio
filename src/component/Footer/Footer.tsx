import "./Footer.scss";
function Footer(props: {
  Footer: {
    title: string;
  };
}) {
  return (
    <div className="row m-0 p-0 footer">
      <div className="col-6"></div>
      <div className="col-6">
        <p>{props.Footer.title}</p>
      </div>
    </div>
  );
}

export default Footer;
