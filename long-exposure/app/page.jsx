"use client"

import { getUserRole } from './functions';
import { useEffect, useState } from 'react';

export default function Home() {
  
  const [role, setRole] = useState("anon");

  useEffect(() => {
    getUserRole().then((role) => setRole(role));
  } , [role]);

  return (<>
    {role === "user" ? (
      <div>
        <h1> Welcome </h1>
      </div>
      ) : ( 
        <div>
          <h1> Not registered </h1>
            please <a href="/login">log-in</a> to continue
        </div>
      )
    }
      </>
  );
}
