type FillRule = 'nonzero' | 'evenodd';

export interface AppState {
  fontList: any;
  customFont?: any;
  fontFamily: string;
  fontVariant: string;
  text: string;
  size: number;
  lineHeight: number;
  letterSpacing: number;
  union: boolean;
  kerning: boolean;
  filled: boolean;
  separate: boolean;
  bezierAccuracy: string;
  dxfUnits: string;
  fill: string;
  stroke: string;
  strokeWidth: string;
  strokeNonScaling: boolean;
  fillRule: FillRule;
  svgOutput: string;
  dxfOutput: string;
  errorMessage: string;
}

export const defaultState: AppState = {
  fontList: null,
  customFont: undefined,
  fontFamily: 'ABeeZee',
  fontVariant: 'regular',
  text: 'Verb',
  size: 100,
  lineHeight: 1.2,
  letterSpacing: 0,
  union: false,
  kerning: true,
  filled: false,
  separate: false,
  bezierAccuracy: '',
  dxfUnits: '',
  fill: '#000000',
  stroke: '#000000',
  strokeWidth: '0.25mm',
  strokeNonScaling: true,
  fillRule: 'evenodd' as FillRule,
  svgOutput: '',
  dxfOutput: '',
  errorMessage: '',
};
