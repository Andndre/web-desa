import React from "react";

import LogoLight2x from "@/assets/images/logo2x.png";
import LogoDark2x from "@/assets/images/logo-dark2x.png";
import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href={`/`} className="logo-link" legacyBehavior>
      <a>
        <Image
          className="logo-light logo-img"
          src={LogoLight2x}
          alt="logo"
          width={130}
          height={40}
        />
        <Image
          className="logo-dark logo-img"
          src={LogoDark2x}
          alt="logo"
          width={130}
          height={40}
        />
      </a>
    </Link>
  );
};

export default Logo;
