const requestAccessHTML = (variables: any) => `
    <html>
        <body>
<!-- Header -->
            <div style="background-color: #f5f5f5; padding: 20px 0;">
                <div style="max-width: 600px; margin: 0 auto; padding: 0 20px;">
                    <div style="text-align: center;">
                        <img src="https://tickets22.baraa.app/logo.png" alt="Tickets22 Logo" style="max-width: 100px; margin: 0 auto; display: block;" />
                    </div>
                </div>
            </div>
<!-- Body -->
            <div style="max-width: 600px; margin: 0 auto; padding: 0 20px;">
                <div style="background-color: #fff; padding: 20px;">
                    <h1 style="font-size: 24px; margin: 0 0 20px 0;">Request Access</h1>
                    <p style="font-size: 16px; line-height: 24px; margin: 0 0 20px 0;">You have requested access to import purchased tickets to user with ip ${variables.ip}. Please click the button below <b>from the same device</b> to verify this action.</p>
                    <a href="${variables.url}" style="background-color: #EEEEE4; color: #83113A; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 0 0 20px 0;">Complete Import</a>
                    <p style="font-size: 16px; line-height: 24px; margin: 0 0 20px 0;">If you did not request access, please ignore this email.</p>
                </div>
            </div>
<!-- Footer -->
            <div style="background-color: #f5f5f5; padding: 20px 0;">
                <div style="max-width: 600px; margin: 0 auto; padding: 0 20px;">    
                    <div style="text-align: center;">
                        <a href="https://tickets22.baraa.app" target="_blank" style="font-size: 16px; line-height: 24px; margin: 0 0 20px 0;">Tickets22</a>
                    </div>
                </div>
            </div>
        </body>
    </html>
`

export default requestAccessHTML