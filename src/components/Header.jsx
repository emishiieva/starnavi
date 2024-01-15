import Select from 'react-select';
import Button from './Button';
import { useState } from 'react';

const Header = ({ 
  options,
  onChange,
  isLoading,
  isActiveMode,
  setIsActiveMode,
  error,
}) => {
  
  const [btnText, setBtnText] = useState('START');
  const [isDisabled, setIsDisabled] = useState(false);

  const handleBtnClick = () => {
    setIsActiveMode(!isActiveMode);
    if (!isActiveMode) {
      setBtnText('STOP');
      setIsDisabled(true);
    } else {
      setBtnText('START');
      setIsDisabled(false);
    }
  }

  return ( 
    <>
      <div className="header">
        <Select 
          onChange={onChange}
          isLoading={isLoading}
          placeholder="Pick mode"
          options={options}
          name="name"
          isDisabled={isDisabled}
        />
        <Button text={btnText} onClick={handleBtnClick} isLoading={isLoading} />
      </div>
      {error && <div className='error'>Only default mode is available!!!</div>}
    </>
   );
}
 
export default Header;
