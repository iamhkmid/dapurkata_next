import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const initHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
};

type TUseQueryProps = {
  url: string;
  method: "POST" | "PUT" | "DELETE" | "GET" | "PATCH";
  skip?: boolean;
  headers?: { [name: string]: string | boolean };
  body?: { [name: string]: string };
  refetchDelay?: number;
}

const useQuery = <TResponse>({ url, method, body: customBody = {}, headers: customHeaders = {}, skip, refetchDelay = 0 }: TUseQueryProps) => {
  const [data, setData] = useState(null);
  const [isDirty, setIsDirty] = useState(false);
  const [error, setError] = useState(null);
  const [headers, setHeaders] = useState(customHeaders);
  const [body, setBody] = useState({});
  const [loading, setLoading] = useState(false);

  const refetch = ({ body: refetchBody = body, headers: refetchHeaders = initHeaders } = {}) => {
    setBody(refetchBody);
    setHeaders({ ...initHeaders, ...refetchHeaders });
  };

  useEffect(() => {
    let unmount = false;
    let onRefetchDelay: any = null;
    const source = axios.CancelToken.source();

    const request = async () => {
      try {
        if (!unmount) setLoading(true);
        const res = await axios.request({
          url,
          method,
          headers: { ...initHeaders, ...headers },
          data: { ...customBody, ...body },
          cancelToken: source.token,
        });
        if (!unmount) setData(res.data);
      } catch (err: any) {
        if (err.response && err.response.status === 401) {
          sessionStorage.removeItem("token")
          window.location.assign("/login");
        }
        if (!unmount) setError(err.response || err);
      } finally {
        if (!unmount) setLoading(false);
        if (!unmount && !isDirty) setIsDirty(true);
      }
    };
    if (!skip) {
      setError(null);
      setData(null);
      if (isDirty) onRefetchDelay = setTimeout(() => { request(); }, refetchDelay);
      else request();
    };
    return () => {
      unmount = true;
      source.cancel(`cancel req ${url}`);
      clearTimeout(onRefetchDelay);
    };
  }, [skip, body, headers]);

  return { data: data as TResponse, error, loading, refetch };
};

export default useQuery