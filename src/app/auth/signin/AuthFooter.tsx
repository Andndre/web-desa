import { Row, Col } from "reactstrap";
import Link from "next/link";

const AuthFooter = () => {
  return (
    <div className="nk-footer nk-auth-footer-full">
      <div className="container wide-lg">
        <Row className="g-3">
          <Col lg={6} className="order-lg-last">
            <ul className="nav nav-sm justify-content-center justify-content-lg-end">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  target="_blank"
                  href={"/auths/terms"}
                >
                  Terms &amp; Condition
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  target="_blank"
                  href={`/auths/terms`}
                >
                  Privacy Policy
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" target="_blank" href={`/auths/faq`}>
                  Help
                </Link>
              </li>
            </ul>
          </Col>
          <Col lg="6">
            <div className="nk-block-content text-center text-lg-start">
              <p className="text-soft">
                &copy; 2022 Dashlite. All Rights Reserved.
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default AuthFooter;
