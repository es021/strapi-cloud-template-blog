'use strict';
const bootstrap = require("./bootstrap");

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    const bucketName = process.env.GCS_BUCKET_NAME;
    const cdnBaseUrl = process.env.CDN_BASE_URL;
    const serviceAccountRaw = process.env.GCS_SERVICE_ACCOUNT;
    let serviceAccountParsed = false;
    let serviceAccountError = null;
    try {
      if (serviceAccountRaw) {
        JSON.parse(serviceAccountRaw);
        serviceAccountParsed = true;
      }
    } catch (e) {
      serviceAccountError = e.message;
    }
    strapi.log.info('[GCS ENV CHECK] GCS_BUCKET_NAME:', bucketName || '(not set)');
    strapi.log.info('[GCS ENV CHECK] CDN_BASE_URL:', cdnBaseUrl || '(not set)');
    strapi.log.info('[GCS ENV CHECK] GCS_SERVICE_ACCOUNT set:', !!serviceAccountRaw);
    strapi.log.info('[GCS ENV CHECK] GCS_SERVICE_ACCOUNT valid JSON:', serviceAccountParsed);
    if (serviceAccountError) strapi.log.error('[GCS ENV CHECK] GCS_SERVICE_ACCOUNT parse error:', serviceAccountError);

    strapi.db.lifecycles.subscribe({
      models: ['plugin::upload.file'],
      beforeCreate(event) {
        const { data } = event.params;
        if (data.name) {
          data.name = data.name.replace(/\s+/g, '_');
        }
        if (data.url) {
          const u = new URL(data.url);
          u.pathname = u.pathname.split('/').map(s => encodeURIComponent(decodeURIComponent(s))).join('/');
          data.url = u.toString();
        }
        if (data.formats) {
          for (const format of Object.values(data.formats)) {
            if (format.url) {
              const u = new URL(format.url);
              u.pathname = u.pathname.split('/').map(s => encodeURIComponent(decodeURIComponent(s))).join('/');
              format.url = u.toString();
            }
          }
        }
      },
    });
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap,
};
