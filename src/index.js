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
