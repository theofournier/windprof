
export function resetPasswordEmailTemplate(name: string, url: string): string {
    return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F5F4F0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F4F0;padding:48px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:520px;background:#ffffff;border-radius:12px;border:1px solid #E5E2DC;overflow:hidden;">

        <!-- Header -->
        <tr>
          <td style="background:#0E1A2B;padding:32px 40px;">
            <div style="font-family:Georgia,serif;font-size:22px;font-weight:500;color:#ffffff;letter-spacing:-0.02em;">
              Windprof
            </div>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px 40px 32px;">
            <p style="margin:0 0 8px;font-family:monospace;font-size:11px;font-weight:600;letter-spacing:0.12em;color:#E8724C;text-transform:uppercase;">
              ↳ RÉINITIALISATION
            </p>
            <h1 style="margin:0 0 20px;font-size:28px;font-weight:900;color:#0E1A2B;letter-spacing:-0.02em;text-transform:uppercase;line-height:1.05;">
              Nouveau mot<br>de passe.
            </h1>
            <p style="margin:0 0 28px;font-size:15px;line-height:1.6;color:#6B7280;">
              Bonjour ${name},<br><br>
              Tu as demandé à réinitialiser ton mot de passe Windprof.
              Clique sur le bouton ci-dessous — ce lien est valable <strong>1 heure</strong>.
            </p>
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="border-radius:8px;background:#E8724C;">
                  <a href="${url}" style="display:inline-block;padding:16px 32px;font-size:13px;font-weight:700;color:#ffffff;text-decoration:none;letter-spacing:0.05em;text-transform:uppercase;">
                    Réinitialiser mon mot de passe →
                  </a>
                </td>
              </tr>
            </table>
            <p style="margin:28px 0 0;font-size:13px;color:#9CA3AF;line-height:1.5;">
              Si tu n'as pas fait cette demande, ignore cet email — ton mot de passe restera inchangé.
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:24px 40px;border-top:1px solid #E5E2DC;">
            <p style="margin:0;font-family:monospace;font-size:10px;color:#9CA3AF;letter-spacing:0.08em;text-transform:uppercase;">
              © WINDPROF — windprof.fr
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}