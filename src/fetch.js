const baseUrl = "https://dev.xtrade.no";
const loginUrl = `${baseUrl}/login`;
const dataUrl = `${baseUrl}/graphql?locale=en`;

export const login = async (username, password, rememberMe) => {
  const response = await fetch(loginUrl, {
    method: "post",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ username, password, remember: rememberMe }),
  });
  if (!response.ok) {
    console.log("Could not log in");
    return;
  }
  const user = await response.json();

  return await user.token;
};
const query = {
  query: `{
    brand(id: "kährs") {
      id
      master_products {
        products {
          id
          name
          descriptions {
            id
            value
          }
        }
      }
    }
  }
  `,
};

export const getData = async (token) => {
  const headers = [];
  headers.push(["Content-Type", "application/json; charset=utf-8"]);
  headers.push(["Authorization", `Bearer ${token}`]);

  const response = await fetch(dataUrl, {
    method: "post",
    headers,
    body: JSON.stringify(query),
  });
  if (!response.ok) {
    console.log("Could not fetch data");
    console.log(`${response.status} - ${response.statusText}`);
    return;
  }
  return await response.json();
};
