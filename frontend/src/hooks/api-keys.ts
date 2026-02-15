export const apiKeys = {
  auth: {
    currentUser: () => ["auth", "currentUser"] as const,
  },

  today: {
    all: ["today"] as const,
  },

  habits: {
    all: ["habits"] as const,
     week: (userId: number, start: string) => ["habits", "week", userId, start] as const,
  },
};