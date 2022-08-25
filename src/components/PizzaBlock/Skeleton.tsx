import React from "react";
import ContentLoader from "react-content-loader";

export const Skeleton: React.FC = () => (
  <ContentLoader
    speed={2}
    width={310}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    className="pizza-block">
    <circle cx="145" cy="122" r="122" />
    <rect x="0" y="275" rx="10" ry="10" width="280" height="18" />
    <rect x="0" y="314" rx="10" ry="10" width="280" height="92" />
    <rect x="0" y="430" rx="10" ry="10" width="93" height="24" />
    <rect x="121" y="418" rx="18" ry="18" width="155" height="42" />
  </ContentLoader>
);
