export const makeRecoveredData = (email: string) => {
  return {
    email: email,
    from: 'front-admin',
    message: `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='http://localhost:3000/#/set-new-password/$token$'>
link</a>
</div>`,
  }
}
