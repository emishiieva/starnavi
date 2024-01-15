const Button = ({ text, onClick, isLoading }) => {
  return ( 
    <button onClick={onClick} disabled={isLoading}>{text}</button>
   );
}
 
export default Button;