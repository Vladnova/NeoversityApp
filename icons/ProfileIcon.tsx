import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const ProfileIcon = (props: SvgProps) => {
    const { stroke = "#212121", strokeOpacity = 0.8, ...otherProps } = props;

    return (
        <Svg width={24} height={24} fill="none" {...otherProps}>
            <Path
                stroke={stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity={strokeOpacity}
                d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
            />
            <Path
                stroke={stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity={strokeOpacity}
                d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                clipRule="evenodd"
            />
        </Svg>
    );
};

export default ProfileIcon;