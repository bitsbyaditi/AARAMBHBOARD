import './App.css';
import LiveInput from './components/LiveInput';
import Card from './components/Card';
import DashboardGrid from './components/DashboardGrid';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <LiveInput />
      <Card title="My Widget" content="This is a reusable card." />
      <DashboardGrid />
    </div>
  );
}

export default App;
