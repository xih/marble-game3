import dynamic from "next/dynamic";
import React, { ComponentType, ForwardedRef, ReactNode } from "react";
import "react-nipple/lib/styles.css";

// type NewType = ForwardedRef<Options>;

const ReactNipple: NippleFunc = dynamic(() => import("react-nipple"), {
  ssr: false,
});

// console.log(ReactNipple);

interface Options {
  mode: string;
  position: {
    top: string;
    left: string;
  };
  size: number;
}

type NippleFunc = ({
  options,
  style,
  onMove,
}: {
  options: any;
  style: any;
  onMove: any;
}) => ReactNode;
// type NippleFunc2 = ComponentClass<{ options: Options }, any>;

// type Props = { data: Options };

// type RNFunc = React.ForwardedRef<string>(props: Options)

const NippleControls2 = () => {
  console.log("does it go here!");
  if (typeof window !== "undefined") {
    return (
      <ReactNipple
        // supports all nipplejs options
        // see https://github.com/yoannmoinet/nipplejs#options
        options={{
          mode: "static",
          position: { top: "50%", left: "50%" },
          size: 100,
        }}
        // any unknown props will be passed to the container element, e.g. 'title', 'style' etc
        style={{
          outline: `1px dashed red`,
          width: 150,
          height: 150,
          // if you pass position: 'relative', you don't need to import the stylesheet
        }}
        // all events supported by nipplejs are available as callbacks
        // see https://github.com/yoannmoinet/nipplejs#start
        onMove={(evt, data) => console.log(evt, data)}
      />
    );
  }
  return null;
};

export default NippleControls2;
