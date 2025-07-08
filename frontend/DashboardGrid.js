import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

function DashboardGrid() {
  const layout = [
    { i: 'a', x: 0, y: 0, w: 2, h: 2 },
    { i: 'b', x: 2, y: 0, w: 2, h: 2 },
    { i: 'c', x: 4, y: 0, w: 2, h: 2 },
  ];

  return (
    <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
      <div key="a" style={{ border: '1px solid #000' }}>Widget A</div>
      <div key="b" style={{ border: '1px solid #000' }}>Widget B</div>
      <div key="c" style={{ border: '1px solid #000' }}>Widget C</div>
    </GridLayout>
  );
}

export default DashboardGrid;
