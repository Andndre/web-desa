"use client";

import classNames from "classnames";
import { useState, ReactNode, useContext } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { Context } from "./providers";

interface TabsProps {
  titles: string[];
  components: ReactNode[];
}

export const Tabs = ({ titles, components }: TabsProps) => {
  const [activeTab, setActivetab] = useState(0);
  const { loading } = useContext(Context)!;

  const toggle = (tab: number) => {
    setActivetab(tab);
  };

  return (
    <div>
      <Nav tabs>
        {titles.map((title, index) => (
          <NavItem key={index}>
            <NavLink
              tag="a"
              href="#tab"
              className={classNames({ active: activeTab === index })}
              onClick={(ev) => {
                ev.preventDefault();
                toggle(index);
              }}
            >
              {title}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      <TabContent activeTab={activeTab}>
        {components.map((component, index) => (
          <TabPane tabId={index.toString()} key={index}>
            {component}
          </TabPane>
        ))}
      </TabContent>
    </div>
  );
};
