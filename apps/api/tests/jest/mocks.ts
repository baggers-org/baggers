import './mocks';
import tk from 'timekeeper';

const DateMock = new Date('2022/01/17');

jest.mock('@baggers/env', () => ({
  setupEnv: () => ({}),
}));
tk.freeze(DateMock);
