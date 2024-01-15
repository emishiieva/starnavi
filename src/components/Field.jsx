import { useEffect, useState } from 'react';

const Field = ({ size, isActiveMode }) => {
  const [field, setField] = useState(Array(size).fill(0).map(() => Array(size).fill(false)));  
  const [hover, setHover] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState('');

  useEffect(() => {
    setField(Array(size).fill(0).map(() => Array(size).fill(false)));
  }, [size])

  const handleHover = (row, col) => {
    if (isActiveMode) {
      setHover({ row, col });
      setField((prevField) => {
        const value = prevField[row][col] ? false : true;
        const newField = prevField.map((rowArray, rowIndex) =>
          rowIndex === row ? rowArray.map((isBlue, colIndex) => (colIndex === col ? value : isBlue)) : rowArray
        );
        setTooltipContent(`Row: ${row + 1}, Col: ${col + 1}`);
        setShowTooltip(true);
        return newField;
      });
    }  
  };

  const handleMouseLeave = () => {
    setHover(null);
    setShowTooltip(false);
  };

  return ( 
    <div className="field">
      {field.map((row, rowIndex) => (
        <div 
          key={rowIndex}
          className="row"
        >
          {row.map((isBlue, colIndex) => (
            <div
              key={colIndex}
              className={`square ${isBlue ? 'blue' : 'white'}`}
              onMouseEnter={() => handleHover(rowIndex, colIndex)}
              onMouseLeave={handleMouseLeave}
              style={{ width: `${750 / size}px`, height: `${750 / size}px` }}
            >
              {showTooltip && hover && hover.row === rowIndex && hover.col === colIndex && (
                <div className="tooltip">
                  {tooltipContent}
                </div>
              )}              
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
 
export default Field;