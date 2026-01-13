type FillRule = 'nonzero' | 'evenodd';

interface AppState {
  fontList: any;
  customFont?: any;
  fontFamily: string;
  fontVariant: string;
  text: string;
  size: number;
  lineHeight: number;
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

type Listener = () => void;

class AppStore {
  private state: AppState = {
    fontList: null,
    customFont: undefined,
    fontFamily: '',
    fontVariant: '',
    text: 'Verb',
    size: 100,
    lineHeight: 1.2,
    union: false,
    kerning: true,
    filled: true,
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

  private listeners: Set<Listener> = new Set();

  getState(): AppState {
    return this.state;
  }

  setState(updates: Partial<AppState>) {
    this.state = { ...this.state, ...updates };
    this.listeners.forEach(listener => listener());
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}

export const appStore = new AppStore();
