import Link from "next/link";
import LocaleSwitcher from "../locale-switcher";
import "./Header.scss";
function Header(props: {
  header: { id: number; name: string; url: string }[];
}) {
  return (
    <div className="row m-0 p-0 py-2">
      <div className="col-2">
        <Link href={"/"} className="text-decoration-none">
          <h1 className="d-block m-auto header-title">
            ACH<span>02</span>RAF
          </h1>
        </Link>
      </div>
      <div className="col-8 d-block m-auto">
        <ul className="list-unstyled d-flex justify-content-center align-items-center p-0 m-0 ">
          {props.header.map((item) => (
            <li className="px-2" key={item.id}>
              <Link
                className="text-decoration-none header-link"
                href={`\#${item.url}`}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-2 d-block m-auto header-div3">
        <LocaleSwitcher />
      </div>
    </div>
  );
}

export default Header;
