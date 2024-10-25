import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const PostsIcon = (props: SvgProps) => {
    const { stroke = "#212121", fill = "none", strokeOpacity = 0.8, ...otherProps } = props;

    return (
        <Svg width={24} height={24} fill={fill} {...otherProps}>
            <Path fill={fill} d="M0 0h24v24H0z" />
            <Path
                stroke={stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity={strokeOpacity}
                d="M3 3h7v7H3V3ZM14 3h7v7h-7V3ZM14 14h7v7h-7v-7ZM3 14h7v7H3v-7Z"
                clipRule="evenodd"
            />
        </Svg>
    );
};

export default PostsIcon;