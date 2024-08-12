"use client";
import React, { useState } from "react";

export default function ThrowErrorButton() {
  const [shouldThrowError, setShouldThrowError] = useState(false);

  function callError() {
    throw new Error("This is a test error");
  }
  if (shouldThrowError === true) {
    callError();
  }
  return (
    <button className="error-button" onClick={() => setShouldThrowError(true)}>
      Throw error
    </button>
  );
}
