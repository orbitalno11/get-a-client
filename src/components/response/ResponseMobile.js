import { Grid } from "antd";
const { useBreakpoint } = Grid;

export default function ResponseMobile() {
    const screens = useBreakpoint();
    const mobileSize = screens.xs || (screens.sm && !screens.md) 
    return mobileSize
}
