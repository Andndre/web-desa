import React from "react";

import LogoLight2x from "@/images/logo2x.png";
import LogoDark2x from "@/images/logo-dark2x.png";
import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href={`/`} className="logo-link" legacyBehavior>
      <Image className="logo-light logo-img" src={LogoLight2x} alt="logo" />
      <Image className="logo-dark logo-img" src={LogoDark2x} alt="logo" />
    </Link>
  );
};

export default Logo;
