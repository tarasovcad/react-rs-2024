import { useState, useEffect } from "react";

export default function ThrowErrorButton() {
  const [shouldThrowError, setShouldThrowError] = useState(false);

  useEffect(() => {
    if (shouldThrowError) {
      throw new Error("This is a test error");
    }
  }, [shouldThrowError]);

  return (
    <button className="error-button" onClick={() => setShouldThrowError(true)}>
      Throw error
    </button>
  );
}
