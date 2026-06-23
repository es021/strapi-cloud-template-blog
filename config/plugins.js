module.exports = ({ env }) => {
  const useGCS = env.bool('USE_GCS', false);

  if (!useGCS) return {};

  return {
    upload: {
      config: {
        provider: 'strapi-provider-upload-google-cloud-storage',
        providerOptions: {
          serviceAccount: env.json('GCS_SERVICE_ACCOUNT'),
          bucketName: env('GCS_BUCKET_NAME'),
          publicFiles: false,
          uniform: true,
          basePath: '',
          baseUrl: env('CDN_BASE_URL', `https://storage.googleapis.com/${env('GCS_BUCKET_NAME')}`),
        },
      },
    },
  };
};
