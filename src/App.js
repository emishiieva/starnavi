import { useQuery } from 'react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Field from './components/Field';
import Header from './components/Header';

const App = () => {
  const [options, setOptions] = useState([]);
  const [size, setSize] = useState(5);
  const [isActiveMode, setIsActiveMode] = useState(false);

  const retrieveModes = async () => {
    const response = await axios.get('https://60816d9073292b0017cdd833.mockapi.io/modes');
    return response.data;
  }
  const { data, error, isLoading } = useQuery('modes', retrieveModes, {
    initialData: [],
  });

  useEffect(() => {
    if (data) {
      setOptions(data.map((opt) => ({...opt, value: opt.name, label: opt.name})));
    }
  }, [data]);

  const handleChange = (value) => {
    setSize(value.field);
  };

  return (
    <div className="main">
      <Header 
        options={options}
        onChange={handleChange}
        isLoading={isLoading}
        isActiveMode={isActiveMode}
        setIsActiveMode={setIsActiveMode}
        error={error}
      />
      <Field size={size} isActiveMode={isActiveMode} />
    </div>
  );
}

export default App;
