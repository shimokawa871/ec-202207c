import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse

) {
  res.setHeader('Set-Cookie', ['userId=1']);
          res.status(200).json({
            console.log(req.body(?))
          });
}
