export const apiKeys = {
  auth: {
    currentUser: () => ["auth", "currentUser"] as const,
  },

  today: {
    all: ["today"] as const,
  },

  habits: {
    all: ["habits"] as const,
     week: (start: string) => ["habits", "week", start] as const,
  },
};