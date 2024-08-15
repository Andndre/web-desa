import React from "react";
import {
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Progress,
  Badge,
} from "reactstrap";
import { PreviewCard } from "@/component/Component";
import { setDeadlineDays } from "@/utils/Utils";
import UserAvatar from "@/component/user/UserAvatar";
import Icon from "@/component/icon/Icon";
import Link from "next/link";

export const ProjectCard = ({ ...props }) => {
  return (
    <React.Fragment>
      <PreviewCard className="h-100">
        <div className="project">{props.children}</div>
      </PreviewCard>
    </React.Fragment>
  );
};

export const ProjectHead = ({ color, initial, title, subtitle }) => {
  return (
    <div className="project-head">
      <Link
        href="#title"
        onClick={(ev) => {
          ev.preventDefault();
        }}
        className="project-title"
      >
        <UserAvatar className="sq" theme={color} text={initial} />
        <div className="project-info">
          <h6 className="title">{title}</h6>
          <span className="sub-text">{subtitle}</span>
        </div>
      </Link>
      <UncontrolledDropdown>
        <DropdownToggle tag="a" className="btn btn-icon btn-trigger">
          <Icon name="more-h"></Icon>
        </DropdownToggle>
        <DropdownMenu end>
          <ul className="link-list-opt no-bdr">
            <li>
              <Link
                href="#view"
                onClick={(ev) => {
                  ev.preventDefault();
                }}
              >
                <Icon name="eye"></Icon>
                <span>View Project</span>
              </Link>
            </li>
            <li>
              <Link
                href="#edit"
                onClick={(ev) => {
                  ev.preventDefault();
                }}
              >
                <Icon name="edit"></Icon>
                <span>Edit Project</span>
              </Link>
            </li>
            <li>
              <Link
                href="#markasdone"
                onClick={(ev) => {
                  ev.preventDefault();
                }}
              >
                <Icon name="check-round-cut"></Icon>
                <span>Mark As Done</span>
              </Link>
            </li>
          </ul>
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
};

export const ProjectBody = ({ desc, task, percentage, team, date }) => {
  var days = setDeadlineDays(date);
  return (
    <React.Fragment>
      <div className="project-details">{desc}</div>
      <div className="project-progress">
        <div className="project-progress-details">
          <div className="project-progress-task">
            <Icon name="check-round-cut"></Icon>
            <span>{task} Tasks</span>
          </div>
          <div className="project-progress-percent">{percentage}%</div>
        </div>
        <Progress value={percentage}></Progress>
      </div>
      <div className="project-meta">
        <ul className="project-users g-1">
          {team.slice(0, 2).map((item) => {
            return (
              <li>
                <UserAvatar
                  size="sm"
                  text={item.text}
                  theme={item.theme}
                  image={item.image}
                />
              </li>
            );
          })}
          {team.length > 2 && (
            <li>
              <UserAvatar
                theme="light"
                size="sm"
                text={`+${team.length - 2}`}
              />
            </li>
          )}
        </ul>
        <Badge
          className="badge-dim"
          color={
            days > 10
              ? "light"
              : days <= 10 && days >= 2
              ? "warning"
              : days === 1
              ? "danger"
              : days === 0 && "success"
          }
        >
          <Icon name="clock"></Icon>
          <span>
            {days === 0
              ? "Done"
              : days === 1
              ? "Due Tomorrow"
              : days + " Days Left"}
          </span>
        </Badge>
      </div>
    </React.Fragment>
  );
};
