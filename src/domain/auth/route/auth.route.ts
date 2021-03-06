import { FastifyPluginCallback } from 'fastify';

const authRoute: FastifyPluginCallback = (fastify, _, done) => {
  fastify.get('/google/check', (_, reply) => {
    reply.status(200).send({
      auth: 'auth',
    });
  });
  done();
};

export default authRoute;
