"use client";
import Link from "next/link";
import LocaleSwitcher from "../locale-switcher";
import { useSearchParams } from "next/navigation";
import "./Header.scss";
import Image from "next/image";
function Header(props: {
  header: { id: number; name: string; url: string }[];
}) {
  const asPath = useSearchParams().get("Section");
  return (
    <div className="sticky-top header">
      <div className="row m-0 p-0 py-3">
        <div className="col-lg-2 col-6">
          <Link href={"/"} className="text-decoration-none">

            <Image width={150} height={65} className="header-logo d-block m-auto" src="/Images/logohorizentalwhite1.png" title="ACH02RAF" alt="logo ach02raf" />
          </Link>
        </div>
        <div className="col-8 d-block m-auto d-lg-block d-none">
          <ul className="list-unstyled d-flex justify-content-center align-items-center p-0 m-0 ">
            {props.header.map((item) => (
              <li className="px-2" key={item.id}>
                <Link
                  className={`text-decoration-none header-link ${
                    asPath === item.url ? "header-active" : ""
                  }`}
                  href={`\?Section=${item.url}#${item.url}`}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-lg-2 col-6 d-block m-auto header-div3">
          <LocaleSwitcher />
        </div>
      </div>
    </div>
  );
}

export default Header;
