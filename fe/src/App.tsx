import { ThemeProvider } from 'styled-components';
import theme from './components/style/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App"></div>
    </ThemeProvider>
  );
}

export default App;
