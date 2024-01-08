import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminFormCreation from './components/AdminFormCreation';
import UserFormDisplay from './components/UserFormDisplay';
import AdminFormResponsesView from './components/AdminFormResponsesView';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin/create-form" element={<AdminFormCreation/>} />
        <Route path="/user/form/:formId" element={<UserFormDisplay formId='formId'/>} />
        <Route path="/admin/form/:formId/responses" element={<AdminFormResponsesView formId='formId'/>} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
