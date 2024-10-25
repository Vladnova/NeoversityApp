import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const CreatePostIcon = (props: SvgProps) => {
    const { fill = "#212121", ...otherProps } = props;

    return (
        <Svg width={14} height={14} fill="none" {...otherProps}>
            <Path
                fill={fill}
                fillRule="evenodd"
                d="M7.5.5h-1v6h-6v1h6v6h1v-6h6v-1h-6v-6Z"
                clipRule="evenodd"
            />
        </Svg>
    );
};

export default CreatePostIcon;