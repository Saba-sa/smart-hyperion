import dynamic from "next/dynamic";
import { ComponentProps, memo } from "react";

interface LazySvgProps extends ComponentProps<"svg"> {
  name: string;
}


const DynamicLogo = memo(({ name, ...props }: LazySvgProps) => {
  const LazySvg = dynamic(() => import("../../public/" + name));

  return <LazySvg {...props} />
}, (prevProps, nextProps) => prevProps.name === nextProps.name);

DynamicLogo.displayName = "DynamicLogo";

export default DynamicLogo;