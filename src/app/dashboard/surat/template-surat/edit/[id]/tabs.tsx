"use client";

import classNames from "classnames";
import { useState, ReactNode } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

interface TabsProps {
  titles: string[];
  components: ReactNode[];
}

export const Tabs = ({ titles, components }: TabsProps) => {
  const [activeTab, setActivetab] = useState("0");

  const toggle = (tab: string) => {
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
              className={classNames({ active: activeTab === index.toString() })}
              onClick={(ev) => {
                ev.preventDefault();
                toggle(index.toString());
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
