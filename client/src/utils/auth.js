export async function fetchCurrentUser() {
    try {
      const res = await fetch(`http://localhost:3000/auth/user`, {
        credentials: "include", 
      });
  
      if (!res.ok) throw new Error("Failed to fetch current user.");
  
      const user = await res.json();
      return user;
    } catch (err) {
      console.error("Error fetching current user:", err);
      return null; 
    }
  }