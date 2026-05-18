# CFML Security Best Practices

This document demonstrates OWASP-compliant security patterns for ColdFusion applications, covering the most common vulnerabilities and their mitigations.

## Table of Contents

- [SQL Injection Prevention](#sql-injection-prevention)
- [XSS (Cross-Site Scripting) Prevention](#xss-cross-site-scripting-prevention)
- [File Upload Security](#file-upload-security)
- [Session Security](#session-security)
- [CSRF (Cross-Site Request Forgery) Protection](#csrf-cross-site-request-forgery-protection)
- [Security Checklist](#security-checklist)

---

## SQL Injection Prevention

**Vulnerability:** SQL injection occurs when user input is concatenated directly into SQL queries, allowing attackers to execute arbitrary SQL commands.

**Mitigation:** Use parameterized queries with `cfqueryparam` or modern `queryExecute()` syntax.

### ❌ UNSAFE: Direct variable interpolation

```cfml
<cfquery name="qUserUnsafe">
  SELECT * FROM users WHERE username = '#form.username#'
</cfquery>
```

**Why this is dangerous:** If `form.username = "admin' OR '1'='1"`, the query becomes:
```sql
SELECT * FROM users WHERE username = 'admin' OR '1'='1'
-- Returns ALL users (authentication bypass)
```

### ✅ SAFE: Using cfqueryparam

```cfml
<cfquery name="qUserSafe">
  SELECT * FROM users
  WHERE username = <cfqueryparam value="#form.username#" cfsqltype="cf_sql_varchar">
</cfquery>
```

### ✅ SAFE: Modern CF2025 queryExecute with parameterization

```cfml
<cfset qUserModern = queryExecute(
  "SELECT * FROM users WHERE username = :username",
  { username: { value: form.username, cfsqltype: "cf_sql_varchar" } }
)>
```

### Common cfsqltype values

| Data Type | cfsqltype |
|-----------|-----------|
| String/Varchar | `cf_sql_varchar` |
| Integer | `cf_sql_integer` |
| Decimal/Money | `cf_sql_decimal` |
| Date | `cf_sql_date` |
| DateTime | `cf_sql_timestamp` |
| Boolean | `cf_sql_bit` |
| Text/CLOB | `cf_sql_longvarchar` |

---

## XSS (Cross-Site Scripting) Prevention

**Vulnerability:** XSS occurs when user-supplied data is output to HTML without proper encoding, allowing attackers to inject malicious JavaScript.

**Mitigation:** Use context-specific encoding functions for ALL user output.

### ❌ UNSAFE: Direct output of user input

```cfml
<p>Welcome, #session.username#!</p>
<script>alert('Hello, #session.username#');</script>
```

**Why this is dangerous:** If `session.username = "<script>alert('XSS')</script>"`, the malicious script executes in the browser.

### ✅ SAFE: HTML context encoding

```cfml
<p>Welcome, #encodeForHTML(session.username)#!</p>
```

### ✅ SAFE: JavaScript context encoding

```cfml
<script>
  var username = '#encodeForJavaScript(session.username)#';
  alert('Hello, ' + username);
</script>
```

### ✅ SAFE: URL context encoding

```cfml
<a href="/profile?user=#encodeForURL(session.username)#">View Profile</a>
```

### ✅ SAFE: CSS context encoding

```cfml
<style>
  .user-theme {
    background-color: #encodeForCSS(user.themeColor)#;
  }
</style>
```

### ✅ SAFE: HTML attribute encoding

```cfml
<input type="text" name="username" value="#encodeForHTMLAttribute(form.username ?: '')#">
```

### Context-Specific Encoding Summary

| Context | Function | Example |
|---------|----------|---------|
| HTML body | `encodeForHTML()` | `<p>#encodeForHTML(text)#</p>` |
| JavaScript strings | `encodeForJavaScript()` | `var x = '#encodeForJavaScript(val)#';` |
| URL parameters | `encodeForURL()` | `<a href="?id=#encodeForURL(id)#">` |
| CSS values | `encodeForCSS()` | `color: #encodeForCSS(color)#;` |
| HTML attributes | `encodeForHTMLAttribute()` | `<input value="#encodeForHTMLAttribute(val)#">` |

---

## File Upload Security

**Vulnerability:** Unrestricted file uploads can allow attackers to upload malicious scripts (web shells) and execute arbitrary code on the server.

**Mitigation:** Validate file types, limit file sizes, rename uploads, and store outside webroot.

### ✅ SAFE: Comprehensive file upload validation

```cfml
<cfif structKeyExists(form, "fileUpload") and len(form.fileUpload)>
  <!--- Step 1: Upload with basic restrictions --->
  <cffile
    action="upload"
    fileField="fileUpload"
    destination="#expandPath('./uploads/')#"
    nameConflict="makeunique"
    accept="image/jpeg,image/png,image/gif"
    result="uploadResult">

  <cftry>
    <!--- Step 2: Validate MIME type (server-side check) --->
    <cfif NOT listFindNoCase("image/jpeg,image/png,image/gif", uploadResult.contentType)>
      <cffile action="delete" file="#uploadResult.serverDirectory#/#uploadResult.serverFile#">
      <cfthrow message="Invalid file type. Only JPEG, PNG, GIF allowed.">
    </cfif>

    <!--- Step 3: Validate file size (max 5MB) --->
    <cfif uploadResult.fileSize GT 5242880>
      <cffile action="delete" file="#uploadResult.serverDirectory#/#uploadResult.serverFile#">
      <cfthrow message="File size exceeds 5MB limit.">
    </cfif>

    <!--- Step 4: Rename file to prevent script execution --->
    <cfset safeFileName = createUUID() & "." & uploadResult.serverFileExt>
    <cffile
      action="rename"
      source="#uploadResult.serverDirectory#/#uploadResult.serverFile#"
      destination="#uploadResult.serverDirectory#/#safeFileName#">

    <cfset uploadSuccess = true>
    <cfset uploadedFile = safeFileName>

    <cfcatch>
      <cfset uploadError = cfcatch.message>
    </cfcatch>
  </cftry>
</cfif>
```

### File Upload Security Checklist

- ✅ **Whitelist allowed file types** (MIME type validation server-side)
- ✅ **Enforce file size limits** (prevent DoS attacks)
- ✅ **Rename uploaded files** (use UUIDs, don't trust user-supplied filenames)
- ✅ **Store outside webroot** (if possible, serve via download script)
- ✅ **Scan with antivirus** (if handling user uploads in production)
- ❌ **Never trust file extensions alone** (can be spoofed)
- ❌ **Never execute uploaded files** (disable script execution in upload directory)

---

## Session Security

**Vulnerability:** Insecure session configuration can lead to session hijacking, fixation, and cookie theft.

**Mitigation:** Configure secure session cookies and regenerate session IDs after authentication.

### ✅ SAFE: Secure session configuration (Application.cfc)

```cfml
component {
  this.name = "SecureApp";
  this.sessionManagement = true;
  this.sessionTimeout = createTimeSpan(0, 0, 30, 0); // 30 minutes

  // ✅ SAFE: Secure session cookie configuration
  this.sessionCookie.httpOnly = true;     // Prevent JavaScript access (XSS protection)
  this.sessionCookie.secure = true;       // HTTPS only
  this.sessionCookie.sameSite = "Strict"; // CSRF protection (CF2025+)

  function onSessionStart() {
    session.isAuthenticated = false;
    session.userId = 0;
    session.csrfToken = createUUID();
  }

  function onRequestStart(string targetPage) {
    // ✅ SAFE: Regenerate session ID after login (prevent session fixation)
    if (structKeyExists(url, "justLoggedIn") && url.justLoggedIn) {
      sessionRotate(); // CF2025+ function
    }

    // ✅ SAFE: Security headers
    cfheader(name="Content-Security-Policy", value="default-src 'self'");
    cfheader(name="X-Frame-Options", value="DENY");
    cfheader(name="X-XSS-Protection", value="1; mode=block");
    cfheader(name="X-Content-Type-Options", value="nosniff");
    cfheader(name="Strict-Transport-Security", value="max-age=31536000");
  }
}
```

### Session Security Checklist

- ✅ **httpOnly = true** - Prevents JavaScript from accessing session cookies (XSS mitigation)
- ✅ **secure = true** - Only transmit cookies over HTTPS
- ✅ **sameSite = Strict** - Prevents CSRF attacks (CF2025+)
- ✅ **Regenerate session ID after login** - Prevents session fixation attacks
- ✅ **Set reasonable timeouts** - 15-30 minutes for authenticated sessions
- ✅ **Implement security headers** - CSP, X-Frame-Options, HSTS

---

## CSRF (Cross-Site Request Forgery) Protection

**Vulnerability:** CSRF attacks trick authenticated users into submitting malicious requests without their knowledge.

**Mitigation:** Use CSRF tokens to validate that form submissions originate from your application.

### ✅ SAFE: Generate CSRF token (Application.cfc)

```cfml
function onSessionStart() {
  session.csrfToken = createUUID();
}
```

### ✅ SAFE: Include token in forms

```cfml
<form method="post" action="user/save">
  <input type="hidden" name="csrfToken" value="#session.csrfToken#">

  <label>Username:</label>
  <input type="text" name="username" value="#encodeForHTMLAttribute(form.username ?: '')#">

  <label>Email:</label>
  <input type="email" name="email" value="#encodeForHTMLAttribute(form.email ?: '')#">

  <button type="submit">Save</button>
</form>
```

### ✅ SAFE: Validate token on form submission

```cfml
<cfif structKeyExists(form, "submit")>
  <!--- Validate CSRF token BEFORE processing --->
  <cfif NOT structKeyExists(form, "csrfToken") OR form.csrfToken NEQ session.csrfToken>
    <cfthrow message="Invalid CSRF token. Request rejected.">
  </cfif>

  <!--- Token is valid - proceed with form processing --->
  <cfset saveResult = userService.saveUser(form)>
</cfif>
```

### CSRF Protection Checklist

- ✅ **Generate unique token per session** (on login or session start)
- ✅ **Include token in all state-changing forms** (POST, PUT, DELETE)
- ✅ **Validate token server-side** (before processing any form data)
- ✅ **Use sameSite=Strict cookies** (additional CSRF protection layer)
- ❌ **Never validate CSRF tokens with GET requests** (tokens in URLs can leak)

---

## Security Checklist

### SQL Injection Prevention
- ✅ Use `cfqueryparam` for ALL dynamic SQL values
- ✅ Use `queryExecute()` with parameterization (CF2025+)
- ❌ NEVER concatenate user input into SQL strings

### XSS Prevention
- ✅ Use `encodeForHTML()` for HTML context
- ✅ Use `encodeForJavaScript()` for JavaScript context
- ✅ Use `encodeForURL()` for URL parameters
- ✅ Use `encodeForCSS()` for CSS values
- ✅ Use `encodeForHTMLAttribute()` for HTML attributes
- ❌ NEVER output raw user input without encoding

### File Upload Security
- ✅ Validate MIME type server-side (not just file extension)
- ✅ Enforce file size limits
- ✅ Rename uploaded files (use UUIDs)
- ✅ Store uploads outside webroot (if possible)
- ❌ NEVER trust file extensions alone
- ❌ NEVER execute uploaded files

### Session Security
- ✅ Use `httpOnly` cookies (prevent XSS)
- ✅ Use `secure` cookies (HTTPS only)
- ✅ Use `sameSite=Strict` (CSRF protection)
- ✅ Regenerate session ID after login (prevent session fixation)
- ✅ Set reasonable session timeouts
- ✅ Implement security headers (CSP, X-Frame-Options, HSTS)

### CSRF Protection
- ✅ Generate unique CSRF token per session
- ✅ Include token in all state-changing forms
- ✅ Validate token server-side before processing
- ✅ Use `sameSite=Strict` cookies
- ❌ NEVER include CSRF tokens in GET requests

---

**Related Resources:**
- [FW/1 Patterns](fw1-patterns.md) - Controller and service layer architecture
- [Performance Patterns](performance-patterns.md) - CF2025 optimization techniques
- OWASP Top 10: https://owasp.org/www-project-top-ten/
- ColdFusion Security Best Practices: https://helpx.adobe.com/coldfusion/configuring-administering/configuring-security.html

---

## cfCopirate Extracted Example - Parameterized Repository Method

~~~cfml
/**
 * Returns active users filtered by status.
 *
 * @status string         User status filter.
 * @return query
 */
public query function getUsersByStatus(required string status) {
  var sql = "
    SELECT id, email, status
    FROM users
    WHERE status = :status
  ";

  return queryExecute(
    sql,
    {
      status: { value: arguments.status, cfsqltype: 'cf_sql_varchar' }
    },
    { datasource: variables.datasource }
  );
}
~~~
