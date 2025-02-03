import { useEffect, useRef } from "react";

function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export default usePrevious;



// usage

const [count, setCount] = useState(0);
const prevCount = usePrevious(count);

return (
  <p>
    Now: {count}, Before: {prevCount}
  </p>
);
