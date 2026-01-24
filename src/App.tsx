import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { route } from './routes/router';

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#101822]">
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={route} />
    </div>
  );
}

export default App;
