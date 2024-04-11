export const Fetch = async ({
  token,
  method,
  data,
  url,
}: {
  token?: string;
  method: string;
  data?: any;
  url: string;
}) => {
  let res = await fetch(`${process.env.NEXT_SERVERURL}${url}`, {
    method,
    mode: 'cors', // Specify that you're making cross-origin requests
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json", // this needs to be defined
    },
    body: JSON.stringify(data),
  });
  return res.json();
};


export const createHeader = (token: string) => {
  return {
    headers: {
      Authorization: `${token}`
    }
  }
}