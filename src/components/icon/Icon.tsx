import classNames from "classnames";
import React from "react";

interface IconProps {
  name?: string;
  id?: string;
  className?: string;
  style?: React.CSSProperties;

  [key: string]: any;
}

const Icon = ({ name, id, className, style, ...props }: IconProps) => {
  const iconClass = classNames({
    [`${className}`]: className,
    icon: true,
    ni: true,
    [`ni-${name}`]: true,
  });
  return <em className={iconClass} id={id} style={style} {...props}></em>;
};
export default Icon;

// const NioIcon = (props) =>{
//   let icon =  'ni-'+ props.icon;
//   return(
//       <em className={['ni','icon', icon, props.className ? props.className : null].join(' ')}></em>
//   )
// }

// const SocialIcon = (props) =>{
//   return(
//       <ul className={['social', props.className ? props.className : null].join(' ')}>
//               {props.data.map((data,index) =>
//                   <li key={index}><a href={data.to} onClick={(ev) => ev.preventDefault()}><NioIcon icon={data.icon}/></a></li>
//               )}
//       </ul>
//   )
// }

// const StyledIcon = (props) =>{
//   return(
//       <div className={['styled-icon', props.className ? props.className : null].join(' ')}>
//               {props.children}
//       </div>

//   )
// }

// export {NioIcon, SocialIcon, StyledIcon}
