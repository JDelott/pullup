import React, { useState, useEffect } from 'react';

// Test 1: Unused variables (should show TS6133)
const TestComponent1: React.FC = () => {
  const [count, setCount] = useState(0);
  const [unusedState, setUnusedState] = useState(false); // Should show TS6133
  const unusedVar = 'test'; // Should show TS6133
  const unusedFunction = () => console.log('unused'); // Should show TS6133
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

// Test 2: Type assignment errors (should show TS2322)
const TestComponent2: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);
  
  const addItem = (item: number) => {
    setItems([...items, item]); // Should show TS2322: Type 'number' is not assignable to type 'string'
  };
  
  const wrongTypeAssignment: string = 123; // Should show TS2322
  
  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  );
};

// Test 3: Property access errors (should show TS2339)
const TestComponent3: React.FC = () => {
  const user = { name: 'John' };
  
  return (
    <div>
      <p>{user.age}</p> {/* Should show TS2339: Property 'age' does not exist */}
    </div>
  );
};

// Test 4: Null/undefined errors (should show TS2531/TS2532)
const TestComponent4: React.FC = () => {
  const [user, setUser] = useState<{ name: string } | null>(null);
  
  const displayName = () => {
    return user.name; // Should show TS2531: Object is possibly 'null'
  };
  
  return (
    <div>
      <p>{displayName()}</p>
    </div>
  );
};

// Test 5: Function parameter errors (should show TS7006)
const TestComponent5: React.FC = () => {
  const handleClick = (event) => { // Should show TS7006: Parameter 'event' implicitly has an 'any' type
    console.log(event.target.value);
  };
  
  return (
    <button onClick={handleClick}>Click me</button>
  );
};

// Test 6: Missing return type (should show TS2355 if configured)
function badFunction() {
  if (Math.random() > 0.5) {
    return 'string';
  }
  // Missing return - should show error if noImplicitReturns is true
}

export default TestComponent1;