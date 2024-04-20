import { Session } from "next-auth";

// types/authTypes.ts
export interface User {
    id: string;
    name?: string;
    email: string;
    password?: string; // Only used for creating or verifying user, never stored in session
  }
  
  export interface AuthSession extends Session {
    user: {
      id: string;
      name?: string;
      email: string;
    }
  }
  