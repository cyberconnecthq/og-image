import { IncomingMessage, ServerResponse } from 'http';
import NextCors from 'nextjs-cors';

export async function corsMiddleware(req: IncomingMessage, res: ServerResponse) {
  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  });
}
