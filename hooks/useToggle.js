import {useState} from 'react';

function useToggle(initialState = false) {
  const [state, setState] = useState(initialState);

  const toggle = () => setState(prev => !prev);

  return [state, toggle] as const;
}

export default useToggle;





// usage

const [isModalOpen, toggleModal] = useToggle(); // the state and function is passed

return (
  <div>
    <button onClick={toggleModal}>Modal Toggle</button>
    {isModalOpen && <p>Modal Content</p>}
  </div>
);
