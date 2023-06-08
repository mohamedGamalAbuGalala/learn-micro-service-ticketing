import axios from "axios";
import { useState } from "react";

interface UseRequestProps {
  url: string;
  method: string;
  body: object;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess?: (data: any) => void;
}

export const useRequest = ({
  url,
  method,
  body,
  onSuccess,
}: UseRequestProps) => {
  const [errors, setErrors] = useState<null | JSX.Element>(null);

  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axios.request({
        method,
        url,
        data: body,
      });

      if (onSuccess) {
        onSuccess(response.data);
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setErrors(
        <>
          {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */}
          {err.response.data.errors.map((err: { message: string }) => (
            <p key={err.message} className="text-xs italic text-red-500">
              {err.message}
            </p>
          ))}
        </>
      );
    }
  };

  return { doRequest, errors };
};
