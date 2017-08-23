// export default function handleOfflineLinks () {
//   if (process.BROWSER_BUILD) {
//     window.addEventListener('offline', event => {
//       document.body.classList.add('offline')
//       Array.from(document.querySelectorAll('a'))
//       .forEach(link => {
//         if (linkIsAvailableOffline(link)) {
//           link.classList.add('cached')
//         }
//       })
//     })

//     window.addEventListener('online', event => {
//       document.body.classList.remove('offline')
//     })
//   }
// }
