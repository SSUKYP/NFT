import { SvgIcon, SvgIconProps } from '@mui/material';
import KlaytnSvg from './svg/klaytn-logo.svg';

export function KlaytnIcon(props: SvgIconProps) {
  return <SvgIcon {...props} component={KlaytnSvg} viewBox="0 0 2000 1975.1" />;
}
