import { describe, it } from "node:test"
import assert from "node:assert/strict"
import { existsSync } from "node:fs"

import { ADMIN_NAV } from "../lib/admin/nav.ts"
import { PERMISSIONS } from "../lib/admin/roles.ts"
import { AUDIT_ACTION_LABELS } from "../lib/admin/audit.ts"

// The admin blog is removed source-first: the routes are deleted, the nav entry
// and permission key are gone. An unauthenticated HTTP probe cannot show this,
// because the proxy redirects every /admin/* path to the login whether or not
// it exists, so removal is asserted here instead.

describe("admin blog removal", () => {
  it("deletes the admin blog route directory", () => {
    assert.equal(existsSync("app/admin/(protected)/blog"), false)
    assert.equal(existsSync("components/admin/blog"), false)
  })

  it("leaves no admin blog navigation entry", () => {
    const blogItems = ADMIN_NAV.filter(item => /blog/i.test(item.href) || /blog/i.test(item.label))
    assert.deepEqual(blogItems, [])
  })

  it("leaves no blog icon variant referenced by the nav", () => {
    assert.equal(ADMIN_NAV.some(item => item.icon === ("blog" as unknown)), false)
  })

  it("removes the manageBlog permission from every role", () => {
    assert.equal(Object.keys(PERMISSIONS).includes("manageBlog"), false)
  })

  it("keeps every other admin section in the navigation", () => {
    const hrefs = ADMIN_NAV.map(item => item.href)
    for (const href of [
      "/admin", "/admin/products", "/admin/categories", "/admin/inventory",
      "/admin/orders", "/admin/customers", "/admin/media", "/admin/content",
      "/admin/appearance", "/admin/settings", "/admin/audit-logs",
    ]) {
      assert.ok(hrefs.includes(href), `${href} disappeared from the admin nav`)
    }
  })

  it("preserves the historical blog audit labels so old records stay readable", () => {
    for (const action of [
      "blog.post_create", "blog.post_update", "blog.post_publish",
      "blog.post_unpublish", "blog.post_schedule", "blog.post_archive",
      "blog.post_delete", "blog.post_duplicate",
      "blog.category_create", "blog.category_update",
    ]) {
      assert.ok(
        AUDIT_ACTION_LABELS[action as keyof typeof AUDIT_ACTION_LABELS],
        `audit label for ${action} must survive`,
      )
    }
  })

  it("leaves no blog code anywhere once the public surfaces are gone too", () => {
    for (const path of ["app/blog", "components/blog", "lib/blog"]) {
      assert.equal(existsSync(path), false, `${path} should be deleted`)
    }
  })
})
