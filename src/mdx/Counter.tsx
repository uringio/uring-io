'use client';

import { useState } from 'react';
import * as styles from './Counter.css';

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button
      type="button"
      className={styles.counter}
      onClick={() => setCount((c) => c + 1)}
    >
      点了 {count} 次
    </button>
  );
}
