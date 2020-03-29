export interface SessionState {
    id: string;
    idle?: boolean;
    token: string;
  }

  export enum SessionStatus {
    ACTIVE = 'ACTIVE',
    IDLE = 'IDLE',
    INACTIVE = 'INACTIVE'
  }

  export interface SessionStatusChange {
    newStatus: SessionStatus;
    oldStatus: SessionStatus;
  }
