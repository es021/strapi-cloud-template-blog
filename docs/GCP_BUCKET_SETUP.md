# GCP Bucket Setup — Strapi Media

One-time setup per project. Follow these steps in order.

---

## 1. Create a service account

**IAM & Admin → Service Accounts**

1. Click **+ Create Service Account**. Name it `strapi-uploads`.
2. On the permissions step, add the role **Storage Admin**.
   > ⚠️ Storage Object Admin alone is not enough — `storage.buckets.get` is a project-level permission only included in Storage Admin.
3. After creation, click the account → **Keys** tab → **Add Key → Create new key → JSON**. Download the file.
4. Minify it to a single line for use in `.env`:
   ```bash
   cat your-key-file.json | jq -c .
   ```

> ⚠️ Keep the JSON key outside version control — store it in a folder listed in `.gitignore`.

---

## 2. Create the bucket

**Cloud Storage → Buckets → + Create**

1. **Name**: use your project ID as a prefix, e.g. `my-project-media`. Names are globally unique across all of GCS.
2. **Region**: pick a region close to your server and users.
3. When prompted about **Enforce public access prevention** — **uncheck it**.
4. Leave **Access control** on **Uniform** (not Fine-grained — per-object ACLs cause errors with this provider).
5. Leave everything else default. Click **Create**.

---

## 3. Make the bucket public

**Bucket → Permissions → Grant Access**

1. New principal: `allUsers`
2. Role: **Storage Object Viewer**
3. Save → confirm "Allow public access".

Files will be publicly readable at `https://storage.googleapis.com/YOUR-BUCKET/filename`.

---

## 4. Grant the service account access

**IAM & Admin → IAM**

1. Click **Grant Access**.
2. Principal: `strapi-uploads@your-project.iam.gserviceaccount.com`
3. Role: **Storage Admin**
4. Save.

> ⚠️ This must be done at the **project level** (IAM & Admin → IAM), not the bucket's Permissions tab. The bucket-level tab only covers object permissions.

---

## 5. Configure CORS

**Bucket → Configuration tab → CORS section → Edit**

Without this, the Strapi admin preview panel shows broken images (the browser blocks `crossorigin="anonymous"` requests without CORS headers).

Paste this JSON — replace the production domain when you deploy:

```json
[
  {
    "origin": ["http://localhost:1337", "https://your-admin-domain.com"],
    "method": ["GET"],
    "responseHeader": ["Content-Type"],
    "maxAgeSeconds": 3600
  }
]
```

---

## 6. Set environment variables

```env
# Required
GCS_BUCKET_NAME=my-project-media
GCS_SERVICE_ACCOUNT={"type":"service_account","project_id":"..."}  # minified single-line JSON

# Optional — set to your Cloud CDN domain, or leave empty to serve directly from GCS
CDN_BASE_URL=
```

> ⚠️ Never commit `.env`. For production, set these in your host's environment variable dashboard.

---

## Checklist

- [ ] Service account created with **Storage Admin** at project level
- [ ] JSON key downloaded and kept outside version control
- [ ] Bucket created with Uniform access control, public access prevention off
- [ ] `allUsers` granted Storage Object Viewer on the bucket
- [ ] CORS configured with localhost + production admin origins
- [ ] `GCS_BUCKET_NAME` and `GCS_SERVICE_ACCOUNT` set in `.env`
