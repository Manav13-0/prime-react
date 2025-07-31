import { TableView } from './Components/TableView';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-white py-10 px-4">
      <div className="max-w-6xl mx-auto shadow-xl rounded-2xl bg-white p-8">
        
        <div className="border-t border-dashed border-gray-300 pt-6">
          <TableView />
        </div>
      </div>

      <footer className="text-center mt-10 text-gray-500 text-sm">
        
      </footer>
    </div>
  );
}

export default App;