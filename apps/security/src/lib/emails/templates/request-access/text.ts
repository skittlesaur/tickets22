const requestAccessText = (variables: any) => `You have requested access to import purchased tickets to user with ip ${variables.ip}. Please click the button below *from the same device* to verify this action.
  
  ${variables.url}
  
  If you did not request access, please ignore this email.`

export default requestAccessText