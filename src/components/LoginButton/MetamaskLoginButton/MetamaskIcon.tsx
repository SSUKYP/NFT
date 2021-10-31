import { SvgIcon, SvgIconProps } from '@mui/material';
import MetamaskSvg from './svg/metamask-fox.svg';

export function MetamaskIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} component={MetamaskSvg} viewBox="0 0 318.6 318.6" />
  );
}
