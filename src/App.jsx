import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AddCreator } from './pages/AddCreator.jsx';
import { EditCreator } from './pages/EditCreator.jsx';
import { ViewCreator } from './pages/ViewCreator.jsx';
import { ShowCreators } from './pages/ShowCreators.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/show-creators" replace />} /> {/* Default route */}
        <Route path="/add-creator" element={<AddCreator />} />
        <Route path="/show-creators" element={<ShowCreators />} />
        <Route path="/view-creator/:id" element={<ViewCreator />} /> 
        <Route path="/edit-creator/:id" element={<EditCreator />} /> 
      </Routes>
    </Router>
  );
}

export default App;
