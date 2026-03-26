const API_URL = "http://localhost:8081/api/issues"; 

export const getIssues = async () => {
  const res = await fetch(API_URL);
  return await res.json();
};

export const addIssue = async (issue) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(issue)
  });

  return await res.json();
};